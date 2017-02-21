from rest_framework import serializers

from .models import Task


class TaskUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        exclude = ('owner',)
        extra_kwargs = {'status': {'read_only': True}, 'results': {'read_only': True}}


class TaskAdminSerializer(serializers.HyperlinkedModelSerializer):
    # owner = serializers.ReadOnlyField(source='owner.email')

    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {'owner': {'read_only': True}, 'results': {'read_only': True}}
