from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class UserTestCase(TestCase):
    def setUp(self):
        User.objects.create_superuser(email='admin@adm.in', password='admin')
        User.objects.create(email='test@te.st', password='test')

    def test_users_are_created(self):
        admin = User.objects.get(email='admin@adm.in')
        user = User.objects.get(email='test@te.st')
        self.assertIsNotNone(admin)
        self.assertIsNotNone(user)


class UserAPITestCase(APITestCase):
    url = '/api/users/'
    url_login = '/api/users/login/'
    url_logout = '/api/users/logout/'
    admin_credentials = {'email': 'admin@adm.in', 'password': 'admin'}
    user_credentials = {'email': 'test@te.st', 'password': 'test'}
    temp_user_credentials = {'email': 'temp@te.mp', 'password': 'temp'}

    def setUp(self):
        User.objects.create_superuser(self.admin_credentials['email'], self.admin_credentials['password'])
        User.objects.create_user(self.user_credentials['email'], self.user_credentials['password'])

    def test_user_register(self):
        def check(data, expected_status, expected_message):
            # Get response.
            response = self.client.post(self.url, data=data)

            # Check status.
            self.assertEqual(response.status_code, expected_status)

            # Check message.
            if expected_status == status.HTTP_201_CREATED:
                self.assertEqual(response.data['email'], expected_message['email'])
            else:
                self.assertEqual(response.data, expected_message)

        valid_credentials = {'email': 'test2@te.st', 'password': 'test'}
        invalid_data = {}
        user_created_message = {'email': valid_credentials['email']}

        error_no_required_fields = {'email': ['This field is required.'], 'password': ['This field is required.'],
                                    'confirm_password': ['This field is required.']}
        error_passwords_do_not_match = {'confirm_password': ['Passwords do not match.']}

        # No fields at all.
        check(invalid_data, status.HTTP_400_BAD_REQUEST, error_no_required_fields)

        # No passwords.
        invalid_data['email'] = valid_credentials['email']
        del error_no_required_fields['email']
        check(invalid_data, status.HTTP_400_BAD_REQUEST, error_no_required_fields)

        # No password confirmation.
        invalid_data['password'] = valid_credentials['password']
        del error_no_required_fields['password']
        check(invalid_data, status.HTTP_400_BAD_REQUEST, error_no_required_fields)

        # Wrong confirmation.
        invalid_data['confirm_password'] = valid_credentials['password'] + 'x'
        check(invalid_data, status.HTTP_400_BAD_REQUEST, error_passwords_do_not_match)

        # Fine.
        credentials = {**valid_credentials}
        credentials['confirm_password'] = credentials['password']
        check(credentials, status.HTTP_201_CREATED, user_created_message)
        self.assertEqual(User.objects.count(), 3)

    def test_users_get_and_login_and_logout(self):
        # Anonymous user cannot see any users, logged one can see only himself unless he is admin. Admin is omniscient.
        def check_users_visibility(expected):
            self.assertEqual(self.client.get(self.url).data['count'], expected, 'Error in visibility.')

        # Checking anonymous visibility.
        self.assertEqual(User.objects.count(), 2, 'Invalid initial number of users.')
        check_users_visibility(0)

        # Logging with wrong credentials.
        invalid_credentials = {**self.user_credentials}
        invalid_credentials['password'] += 'x'
        self.assertEqual(self.client.post(self.url_login, data=invalid_credentials).status_code,
                         status.HTTP_401_UNAUTHORIZED, 'Logged in with invalid credentials.')
        check_users_visibility(0)

        # Logging with valid user credentials.
        self.assertEqual(self.client.post(self.url_login, data=self.user_credentials).status_code, status.HTTP_200_OK,
                         'Could not log in with valid credentials.')
        check_users_visibility(1)

        # Logging out.
        self.assertEqual(self.client.post(self.url_logout, data={}).status_code, status.HTTP_204_NO_CONTENT,
                         'Could not log out.')
        check_users_visibility(0)

        # Logging with valid admin credentials.
        self.assertEqual(self.client.post(self.url_login, data=self.admin_credentials).status_code, status.HTTP_200_OK,
                         'Could not log in with valid credentials.')
        check_users_visibility(2)

    def test_users_delete(self):
        # User can delete his own account. Admin can delete any account.
        User.objects.create_user(self.temp_user_credentials['email'], self.temp_user_credentials['password'])
        self.assertEqual(self.client.post(self.url_login, data=self.temp_user_credentials).status_code,
                         status.HTTP_200_OK)

        # Try to remove another user.
        user_id = str(User.objects.get(email=self.user_credentials['email']).pk)
        self.assertEqual(self.client.delete(self.url + user_id + '/').status_code, status.HTTP_404_NOT_FOUND,
                         'Removed another user without privileges.')

        # Remove your own user.
        temp_user_id = str(User.objects.get(email=self.temp_user_credentials['email']).pk)
        self.assertEqual(self.client.delete(self.url + temp_user_id + '/').status_code, status.HTTP_204_NO_CONTENT,
                         'Could not remove own user.')

        # Log out and log in as admin.
        self.assertEqual(self.client.post(self.url_logout, data={}).status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(self.client.post(self.url_login, data=self.admin_credentials).status_code, status.HTTP_200_OK)
        # Remove user as admin.
        self.assertEqual(self.client.delete(self.url + user_id + '/').status_code, status.HTTP_204_NO_CONTENT,
                         'Could not remove user as admin.')

    def test_change_users_password(self):
        # User can change his own password.
        user_id = str(User.objects.get(email=self.user_credentials['email']).pk)
        url = self.url + user_id + '/'

        def check(data, expected_status, expected_message):
            # Get response.
            response = self.client.put(url, data=data)

            # Check status.
            self.assertEqual(response.status_code, expected_status)

            # Check message.
            if expected_status == status.HTTP_201_CREATED:
                self.assertEqual(response.data['email'], expected_message['email'])
            else:
                self.assertEqual(response.data, expected_message)

        credentials = {
            'password': 'invalid',
            'new_password': 'invalid',
            'confirm_new_password': 'invalid2',
        }
        self.assertEqual(self.client.post(self.url_login, data=self.user_credentials).status_code, status.HTTP_200_OK)

        check(credentials, status.HTTP_400_BAD_REQUEST, {'password': 'Wrong password.'})

        credentials['password'] = self.user_credentials['password']
        check(credentials, status.HTTP_400_BAD_REQUEST, {'confirm_new_password': 'Passwords do not match.'})

        credentials['confirm_new_password'] = credentials['new_password']
        check(credentials, status.HTTP_200_OK, {})
