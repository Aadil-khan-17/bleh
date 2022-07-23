from django.db.models import fields
from rest_framework import serializers
from .models import User,Product,Order_Items,Payment_Details,Order_Details

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class Order_ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_Items
        fields = '__all__'

class Payment_DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_Details
        fields = '__all__'

class Order_DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_Details
        fields = '__all__'

