import os
from dotenv import load_dotenv
from config.settings.base import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

dotenv_path = os.path.join(BASE_DIR, ".env")
load_dotenv(dotenv_path)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY", "")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'postgres',
#         'USER': 'postgres',
#         'HOST': 'db', # set in docker-compose.yml
#         'PORT': 5432 # default postgres port
#     }
# }