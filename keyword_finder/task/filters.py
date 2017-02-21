from rest_framework import filters


class IsOwnerOrAdminFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if not request.user:
            return queryset.none()

        if request.user.is_admin:
            return queryset

        return queryset.filter(owner=request.user)
