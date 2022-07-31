from django.db import models
from user.models import User,Product,Order_Items,Payment_Details,Order_Details

class Cart(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    total_amount = models.FloatField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user_id)

class Shipping_Address(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,default=0)
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    postal_code = models.IntegerField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user_id)

class Track_Repairs(models.Model):
    order_id = models.ForeignKey(Order_Items, on_delete=models.CASCADE)
    description = models.CharField(max_length=200, null=True)
    details_id = models.ForeignKey(Order_Details, on_delete=models.CASCADE)
    percent_work_done = models.FloatField()

    def __str__(self):
        return self.order_id

class NFT_Details(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE,default=0)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,default=0)
    token_url = models.CharField(max_length=200,default='')
    expiry_date = models.DateTimeField(default='')
    token_id = models.IntegerField(unique=True,default=0)
    acc_address = models.CharField(max_length=300,default='')
    redeem = models.BooleanField(default=True)
    def _str_(self):
        return str(self.token_id)