from rest_framework import serializers

from .models import User


class UserViewSerializer(serializers.HyperlinkedModelSerializer):
    tasks = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name="task-detail")

    class Meta:
        model = User
        fields = ('url', 'email', 'tasks')


class UserRegisterSerializer(serializers.HyperlinkedModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('url', 'email', 'password', 'confirm_password')
        extra_kwargs = {'password': {'write_only': True, 'style': {'input_type': 'password'}}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        confirm_password = validated_data.pop('confirm_password', None)
        instance = self.Meta.model(**validated_data)
        if password == confirm_password:
            instance.set_password(password)
        else:
            raise serializers.ValidationError({'confirm_password': ['Passwords do not match.']})
        instance.save()
        return instance


class UserPasswordChangeSerializer(serializers.ModelSerializer):
    """Serializer for password change."""

    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    new_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    confirm_new_password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('password', 'new_password', 'confirm_new_password')

    def update(self, instance, validated_data):
        if instance.check_password(validated_data.get('password')):
            new_password = validated_data.get('new_password')
            confirm_new_password = validated_data.get('confirm_new_password')

            if new_password == confirm_new_password:
                instance.set_password(new_password)
                instance.save()
            else:
                raise serializers.ValidationError({'confirm_new_password': 'Passwords do not match.'})
        else:
            raise serializers.ValidationError({'password': 'Wrong password.'})
        return instance


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')
        write_only_fields = ('password',)
