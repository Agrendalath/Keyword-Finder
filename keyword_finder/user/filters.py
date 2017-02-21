from rest_framework import filters


class IsOwnerOrAdminFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if not request.user or request.user.is_anonymous:
            return queryset.none()

        if request.user.is_admin:
            return queryset

        return queryset.filter(pk=request.user.pk)
