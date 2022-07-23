from django.db.models import fields
from rest_framework import serializers
from .models import Cart,Shipping_Address,Track_Repairs,NFT_Details
from user.serializer import ProductSerializer

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class Shipping_AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping_Address
        fields = '__all__'

class Track_RepairsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track_Repairs
        fields = '__all__'

class NFT_DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT_Details
        fields = '__all__'
