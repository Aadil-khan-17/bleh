from django.db import models

class User(models.Model):
    User_type = (
            ('R','Retailer'),
            ('C','Customer'),
        )
    email = models.EmailField(max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    password = models.CharField(max_length=30)
    mobile_no = models.IntegerField()
    company_name = models.CharField(max_length=50,null=True)

    def __str__(self):
        return self.username

def get_product_image_filepath(self, filename):
    return 'product_images/' + str(self.pk) + '/product_image.png'

class Product(models.Model):
    name = models.CharField(max_length=60)
    price = models.FloatField()
    description = models.CharField(max_length=200, null=True)
    image = models.ImageField(max_length=255, upload_to=get_product_image_filepath, null=True, blank=True)
    warranty_period = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,default=3)

    def get_product_image_filename(self):
        return str(self.product_image)[str(self.product_image).index('product_images/' + str(self.pk) + "/"):]

    def __str__(self):
        return self.name

class Order_Items(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user_id)

class Payment_Details(models.Model):
    order_id = models.ForeignKey(Order_Items, on_delete=models.CASCADE)
    total_amount = models.FloatField()
    status = models.BooleanField(default=True)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.status)

class Order_Details(models.Model):
    payment_id = models.ForeignKey(Payment_Details, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.payment_id)
