import Vue from 'vue';
import VueRouter from 'vue-router';
import Movie from '@/views/movie/Movie.vue';
import Book from '@/views/book/Book.vue';
import Music from '@/views/music/Music.vue';
import Photo from '@/views/photo/Photo.vue';
import MovieDetail from '@/views/movie/MovieDetail.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/movie'
  },
  {
    path: '/movie',
    name: 'movie',
    component: Movie
  },{
    path: '/music',
    name: 'music',
    component: Music
  },{
    path: '/photo',
    name: 'photo',
    component: Photo
  },{
    path: '/book',
    name: 'book',
    component: Book
  },{
    path: '/moviedetail/：movieId',
    name: 'MovieDetail',
    component: MovieDetail
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
