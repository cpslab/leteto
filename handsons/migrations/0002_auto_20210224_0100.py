# Generated by Django 3.1.5 on 2021-02-23 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('handsons', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='handson',
            name='end_at',
            field=models.DateTimeField(null=True),
        ),
    ]
