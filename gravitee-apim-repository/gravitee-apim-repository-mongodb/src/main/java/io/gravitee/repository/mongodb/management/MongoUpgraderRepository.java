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
package io.gravitee.repository.mongodb.management;

import io.gravitee.node.api.upgrader.UpgradeRecord;
import io.gravitee.node.api.upgrader.UpgraderRepository;
import io.gravitee.repository.mongodb.management.internal.model.UpgradeRecordMongo;
import io.gravitee.repository.mongodb.management.internal.upgrader.UpgraderMongoRepository;
import io.gravitee.repository.mongodb.management.mapper.GraviteeMapper;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author Kamiel Ahmadpour (kamiel.ahmadpour at graviteesource.com)
 * @author GraviteeSource Team
 */
@Component
public class MongoUpgraderRepository implements UpgraderRepository {

    private final Logger LOGGER = LoggerFactory.getLogger(MongoUpgraderRepository.class);

    @Autowired
    private UpgraderMongoRepository internalUpgraderMongoRepository;

    @Autowired
    private GraviteeMapper mapper;

    @Override
    public Maybe<UpgradeRecord> findById(String id) {
        LOGGER.debug("Find upgrade record by ID [{}]", id);

        final UpgradeRecordMongo record = internalUpgraderMongoRepository.findById(id).orElse(null);

        LOGGER.debug("Find upgrade record by ID [{}] - Done", id);

        return Optional.ofNullable(mapper.map(record, UpgradeRecord.class)).map(Maybe::just).orElseGet(Maybe::empty);
    }

    @Override
    public Single<UpgradeRecord> create(UpgradeRecord upgradeRecord) {
        LOGGER.debug("Create upgrade record [{}]", upgradeRecord.getId());

        UpgradeRecordMongo recordMongo = mapper.map(upgradeRecord, UpgradeRecordMongo.class);
        UpgradeRecordMongo createdRecordMongo = internalUpgraderMongoRepository.insert(recordMongo);

        UpgradeRecord res = mapper.map(createdRecordMongo, UpgradeRecord.class);

        LOGGER.debug("Create upgrade record [{}] - Done", upgradeRecord.getId());

        return Single.just(res);
    }
}
