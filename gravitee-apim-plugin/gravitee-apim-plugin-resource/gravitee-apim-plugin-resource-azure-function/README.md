## Get application scope credentials
az webapp deployment list-publishing-credentials --resource-group <resource-group> --name <app_name>  

## Get azure access token
az account get-access-token 

## Push zip

⚠️ You need to make Access Restrictions to public in order to call this API. Add a rule to whitelist your IP.

````shell
curl -X POST --data-binary @"<path_to_zip>" -H "Authorization: Bearer <access_token>" "https://gravitee-labs-test.scm.azurewebsites.net/api/zipdeploy"
````

