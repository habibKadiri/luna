from django.urls import path

from apps.restaurantreviews.views import CreateRestaurantReviewView, ListSpecificRestaurantReviewsView, \
    ListSpecificUserReviewsView, RetrieveUpdateDestroyReview, ToggleLikeReviewVew, ListReviewsUserLikesView

urlpatterns = [
    path('new/<int:restaurant_id>/', CreateRestaurantReviewView.as_view(), name='Create-restaurant-review'),
    path('restaurant/<int:restaurant_id>/', ListSpecificRestaurantReviewsView.as_view(), name='get-reviews-of-restaurant'),
    path('user/<int:user_id>/', ListSpecificUserReviewsView.as_view(), name='get-reviews-of-a-user'),
    path('<int:review_id>/', RetrieveUpdateDestroyReview.as_view(), name='edit-patch-get-review'),
    path('like/<int:review_id>/', ToggleLikeReviewVew.as_view(), name='toggle-like-review'),
    path('likes/', ListReviewsUserLikesView.as_view(), name='list-current-user-liked-reviews'),
]