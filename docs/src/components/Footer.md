---
sidebarDepth: 2
---

## footerComponent

> Composant 'Pied de page' de l'application
> --> mentions légales, plan du site, crédits, manuel utilisateur

Author: Equipe du projet Oracle - ENSG, TSI

Since: 25.04.2023

Composants enfants :
-- Librairie PrimeVue --
Dialog
Button

Version: 1.0

---

---

## Dialog

### Props

| Prop name        | Description | Type    | Values | Default                 |
| ---------------- | ----------- | ------- | ------ | ----------------------- |
| header           |             | null    | -      | null                    |
| footer           |             | null    | -      | null                    |
| visible          |             | boolean | -      | false                   |
| modal            |             | boolean | -      | null                    |
| contentStyle     |             | null    | -      | null                    |
| contentClass     |             | string  | -      | null                    |
| contentProps     |             | null    | -      | null                    |
| rtl              |             | boolean | -      | null                    |
| maximizable      |             | boolean | -      | false                   |
| dismissableMask  |             | boolean | -      | false                   |
| closable         |             | boolean | -      | true                    |
| closeOnEscape    |             | boolean | -      | true                    |
| showHeader       |             | boolean | -      | true                    |
| baseZIndex       |             | number  | -      | 0                       |
| autoZIndex       |             | boolean | -      | true                    |
| position         |             | string  | -      | 'center'                |
| breakpoints      |             | object  | -      | null                    |
| draggable        |             | boolean | -      | true                    |
| keepInViewport   |             | boolean | -      | true                    |
| minX             |             | number  | -      | 0                       |
| minY             |             | number  | -      | 0                       |
| appendTo         |             | string  | -      | 'body'                  |
| closeIcon        |             | string  | -      | 'pi pi-times'           |
| maximizeIcon     |             | string  | -      | 'pi pi-window-maximize' |
| minimizeIcon     |             | string  | -      | 'pi pi-window-minimize' |
| closeButtonProps |             | null    | -      | null                    |
| \_instance       |             | null    | -      |                         |

### Events

| Event name     | Properties | Description |
| -------------- | ---------- | ----------- |
| update:visible |            |
| show           |            |
| hide           |            |
| after-hide     |            |
| maximize       |            |
| unmaximize     |            |
| dragend        |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| header  |             |          |
| default |             |          |
| footer  |             |          |

---

## Button

### Props

| Prop name   | Description | Type    | Values | Default                 |
| ----------- | ----------- | ------- | ------ | ----------------------- |
| label       |             | string  | -      | null                    |
| icon        |             | string  | -      | null                    |
| iconPos     |             | string  | -      | 'left'                  |
| iconClass   |             | string  | -      | null                    |
| badge       |             | string  | -      | null                    |
| badgeClass  |             | string  | -      | null                    |
| loading     |             | boolean | -      | false                   |
| loadingIcon |             | string  | -      | 'pi pi-spinner pi-spin' |
| link        |             | boolean | -      | false                   |
| severity    |             | string  | -      | null                    |
| raised      |             | boolean | -      | false                   |
| rounded     |             | boolean | -      | false                   |
| text        |             | boolean | -      | false                   |
| outlined    |             | boolean | -      | false                   |
| size        |             | string  | -      | null                    |
| plain       |             | boolean | -      | false                   |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
