import { createRouter, createWebHistory } from 'vue-router';

import About from './pages/About.vue';
import NotFound from './pages/NotFound.vue';

import CoachList from './pages/coaches/CoachList.vue';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';

import ContactCoach from './pages/requests/ContactCoach.vue';

import RequestsReceived from './pages/requests/RequestsReceived.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    // { path: '/', component: CoachList }, // Home route
    { path: '/', redirect: '/coaches' }, // Home route
    { path: '/about', component: About }, // About route
    
    { path: '/coaches', component: CoachList }, // Coaches route  
    { path: '/coaches/:nameId', 
      component: CoachDetail, 
      props: true,
      children: [
          { path: 'contact', component: ContactCoach } // Contact Coach route
      ]
    }, // Coach Detail route
    { path: '/registration', component: CoachRegistration }, // Register as Coach route
    
    { path: '/requests', component: RequestsReceived }, // Requests route

    { path: '/:notFound(.*)', component: NotFound } // Not Found route

  ]
});

export default router; 
