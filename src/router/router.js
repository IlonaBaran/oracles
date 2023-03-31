import Panel from '../components/Panel.vue';

const routes = [
  {
    path: '/panel/:valeur1',
    name: 'panel',
    component: Panel
  },
  // Autres routes ici...
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;