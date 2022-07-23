from django.urls import re_path as url
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt import views as jwt_views
from blockchain.settings import DEBUG, STATIC_URL, STATIC_ROOT, MEDIA_URL, MEDIA_ROOT
from django.conf.urls.static import static
from . import views


urlpatterns = [
    url(r'^login/$', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^refresh/$', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

