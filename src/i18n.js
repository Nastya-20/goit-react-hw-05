import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ua: {
        translation: {
          "welcome": "Ласкаво просимо!",
          "hello": "Привіт",
          "home": "Головна",
          "movies": "Фільми",
          "Search": "Пошук",
          "search_for_movies": "Пошук фільмів...",
          "add_to_favorites": "Додати до обраного",
          "remove_from_favorites": "Видалити з обраного",
          "submit": "Відправити",
          "cancel": "Скасувати",
          "not_found": "Не знайдено",
          "error_loading_data": "Помилка завантаження даних",
          "no_reviews_available": "Відгуки недоступні",
          "movie_details": "Деталі фільму",
          "cast": "Актори",
          "reviews": "Відгуки",
          "release_date": "Дата виходу:",
          "country": "Країна:",
          "genre": "Жанр:",
          "user_score": "Рейтинг:",
          "trending_today": "Тренди сьогодні",
          "go_back": "Повернутися",
          "additional_information":"Додаткова інформація:"
        }
      },
      en: {
        translation: {
          "welcome": "Welcome",
          "hello": "Hello",
          "home": "Home",
          "movies": "Movies",
          "search": "Search",
          "search_for_movies": "Search for movies...",
          "add_to_favorites": "Add to Favorites",
          "remove_from_favorites": "Remove from Favorites",
          "submit": "Submit",
          "cancel": "Cancel",
          "not_found": "Not Found",
          "error_loading_data": "Error loading data",
          "no_reviews_available": "No reviews available",
          "movie_details": "Movie Details",
          "cast": "Cast",
          "reviews": "Reviews",
          "release_date": "Release Date",
          "user_score": "User score:",
          "trending_today": "Trending Today",
          "additional_information": "Additional information:",
          "go_back": "Go back",
          "country": "Country:",
           "genre": "Genre:",
        }
      }
    },
    lng: "ua", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;

