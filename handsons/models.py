from django.db import models
from users.models import CustomUser

def get_deleted_user():
    return CustomUser.objects.get_or_create(name="削除されたユーザ")[0]

# Create your models here.
class Handson(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.SET(get_deleted_user))

    title = models.CharField(max_length=50)
    
    headline = models.CharField(max_length=50)

    detail = models.TextField()

    require = models.TextField()

    document_url = models.URLField()

    meeting_url = models.URLField()

    movie_url = models.URLField()

    start_at = models.DateTimeField()

    end_at = models.DateTimeField()

    created_at = models.DateTimeField('作成日時', auto_now_add=True)
    
    updated_at = models.DateTimeField('更新日時', auto_now=True)

    is_public = models.BooleanField(default=True)

    def __str__(self):
        return 'owner: ' + self.owner.username + ', title: ' + self.title

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Handson'
        verbose_name_plural = 'Handsons'


class HandsonContent(models.Model):

    handson = models.ForeignKey(Handson, on_delete=models.CASCADE)

    content = models.TextField()

    created_at = models.DateTimeField('作成日時', auto_now_add=True)
    
    updated_at = models.DateTimeField('更新日時', auto_now=True)

    def __str__(self):
        return 'title: ' + self.handson.title + ', content: ' + self.content

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'HandsonContent'
        verbose_name_plural = 'HandsonContents'


class ContentPassMember(models.Model):

    content = models.ForeignKey(HandsonContent, on_delete=models.CASCADE)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return 'title: ' + self.content.handson.title + ', content: ' + self.content.content + ', user: ' + self.user.username

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'ContentPassMember'
        verbose_name_plural = 'ContentPassMembers'


class HandsonMember(models.Model):

    handson = models.ForeignKey(Handson, on_delete=models.CASCADE)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return 'title: ' + self.handson.title + ', user: ' + self.user.username

    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'HandsonMember'
        verbose_name_plural = 'HandsonMembers'