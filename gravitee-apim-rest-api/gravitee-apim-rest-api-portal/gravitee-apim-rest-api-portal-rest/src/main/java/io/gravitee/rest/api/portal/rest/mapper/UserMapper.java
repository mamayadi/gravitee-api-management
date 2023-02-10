/**
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.gravitee.rest.api.portal.rest.mapper;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.gravitee.rest.api.idp.api.identity.SearchableUser;
import io.gravitee.rest.api.model.*;
import io.gravitee.rest.api.model.permissions.RoleScope;
import io.gravitee.rest.api.portal.rest.model.*;
import java.util.*;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

/**
 * @author Florent CHAMFROY (florent.chamfroy at graviteesource.com)
 * @author GraviteeSource Team
 */
@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    String IDP_SOURCE_GRAVITEE = "gravitee";
    String IDP_SOURCE_MEMORY = "memory";

    ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    User primaryOwnerEntityToUser(PrimaryOwnerEntity user);

    @Mapping(source = "firstname", target = "firstName")
    @Mapping(source = "lastname", target = "lastName")
    @Mapping(source = "source", target = "editableProfile", qualifiedByName = "calculateEditableProfile")
    @Mapping(source = "roles", target = "permissions", qualifiedByName = "calculatePermissions")
    User userEntityToUser(UserEntity user);

    @Mapping(source = "firstname", target = "firstName")
    @Mapping(source = "lastname", target = "lastName")
    User seachableUserToUser(SearchableUser user);

    NewExternalUserEntity toNewExternalUserEntity(RegisterUserInput input);

    RegisterUserEntity toRegisterUserEntity(FinalizeRegistrationInput input);

    ResetPasswordUserEntity toResetPasswordUserEntity(ChangeUserPasswordInput input);

    @Mapping(target = "notifications", expression = "java(basePath + \"/notifications\")")
    @Mapping(source = "basePath", target = "self")
    UserLinks computeUserLinks(String basePath, Date updateDate);

    @AfterMapping
    static void after(@MappingTarget UserLinks userLinks, String basePath, Date updateDate) {
        final String hash = updateDate == null ? "" : String.valueOf(updateDate.getTime());
        userLinks.setAvatar(basePath + "/avatar?" + hash);
    }

    @Named("calculateEditableProfile")
    static boolean calculateEditableProfile(String source) {
        return IDP_SOURCE_GRAVITEE.equals(source) || IDP_SOURCE_MEMORY.equalsIgnoreCase(source);
    }

    @Named("calculatePermissions")
    static UserPermissions calculatePermissions(Set<UserRoleEntity> roles) {
        if (Objects.isNull(roles)) {
            return null;
        }
        Map<String, List<String>> userPermissions = roles
            .stream()
            .filter(role -> RoleScope.ENVIRONMENT.equals(role.getScope()) || RoleScope.ORGANIZATION.equals(role.getScope()))
            .map(UserRoleEntity::getPermissions)
            .map(
                rolePermissions ->
                    rolePermissions
                        .entrySet()
                        .stream()
                        .collect(
                            Collectors.toMap(
                                Map.Entry::getKey,
                                entry ->
                                    new String(entry.getValue())
                                        .chars()
                                        .mapToObj(c -> (char) c)
                                        .map(String::valueOf)
                                        .collect(Collectors.toList())
                            )
                        )
            )
            .reduce(
                new HashMap<>(),
                (acc, rolePermissions) -> {
                    acc.putAll(rolePermissions);
                    return acc;
                }
            );
        return objectMapper.convertValue(userPermissions, UserPermissions.class);
    }
}
