# Generated by Django 5.0.1 on 2024-01-14 08:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=True)),
                ('profile_avatar', models.ImageField(blank=True, null=True, upload_to='avatars/')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=75, unique=True)),
                ('username', models.CharField(blank=True, max_length=25, null=True, unique=True)),
                ('games_played', models.PositiveIntegerField(default=0)),
                ('games_won', models.PositiveIntegerField(default=0)),
                ('games_lost', models.PositiveIntegerField(default=0)),
                ('games_tied', models.PositiveIntegerField(default=0)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('custom_title', models.CharField(blank=True, max_length=75, null=True)),
                ('groups', models.ManyToManyField(blank=True, related_name='player_groups', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='player_permissions', to='auth.permission')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ExpiredTokens',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=500)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api_accounts.player')),
            ],
            options={
                'unique_together': {('token', 'user')},
            },
        ),
    ]