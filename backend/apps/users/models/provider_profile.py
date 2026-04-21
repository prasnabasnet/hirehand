from django.db import models
from .custom_user import CustomUser

class ProviderProfile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='provider_profile'
    )
    bio = models.TextField(blank=True)
    years_experience = models.PositiveIntegerField(default=0)
    service_radius_km = models.PositiveIntegerField(default=10)
    is_verified = models.BooleanField(default=False)
    license_number = models.CharField(max_length=100, blank=True)
    avg_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    total_reviews = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"ProviderProfile for {self.user.email}"
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.user.role !=  'provider':
            raise ValidationError("User must be a provider to create a provider profile.")
    
