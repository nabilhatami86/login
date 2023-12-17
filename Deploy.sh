GOOGLE_PROJECT_ID=difa-app-12
CLOUD_RUN_SERVICE=difa-app-12-service
INSTANCE_CONNECTION_NAME=difa-app-12:asia-southeast2:difaapp
DB_USER=root
DB_PASS=12345
DB_NAME=profiledb

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
  --project=$GOOGLE_PROJECT_ID

gcloud run deploy $CLOUD_RUN_SERVICE \
  --image gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
  --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
  --update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_USER=$DB_USER,DB_NAME=$DB_NAME \
  --platform managed \
  --region asia-southeast2 \
  --allow-unauthenticated \
  --project=$GOOGLE_PROJECT_ID