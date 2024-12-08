package constants

import "os"

const (
    USER_INDEX = "user"
    POST_INDEX = "post"
)

var (
    ES_URL      = os.Getenv("ES_URL")
    ES_USERNAME = os.Getenv("ES_USERNAME")
    ES_PASSWORD = os.Getenv("ES_PASSWORD")
    GCS_BUCKET  = os.Getenv("GCS_BUCKET")
)