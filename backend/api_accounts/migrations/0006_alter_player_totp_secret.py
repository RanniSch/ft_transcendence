# Generated by Django 5.0.1 on 2024-01-26 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_accounts', '0005_player_is_two_factor_enabled_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='totp_secret',
            field=models.CharField(default='TANMAV5TCGMN4LILRFI2BMIPWDN3BHM4', max_length=100),
        ),
    ]
