from django.db import models

def get_product_image_filepath(self, filename):
    return 'product_images/' + str(self.pk) + '/product_image.png'

class Item(models.Model):
    name = models.CharField(max_length=60, null=True)
    price = models.FloatField()
    description = models.CharField(max_length=200, null=True)
    image = models.ImageField(max_length=255, upload_to=get_product_image_filepath, null=True, blank=True)

    def get_product_image_filename(self):
        return str(self.product_image)[str(self.product_image).index('product_images/' + str(self.pk) + "/"):]

    def __str__(self):
        return self.name
