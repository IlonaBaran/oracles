---
sidebarDepth: 2
---

## Toolbar-box

> TODO

Author: Equipe du projet Oracle - ENSG, TSI

Since: 25.04.2023

Composants enfants :
-- Librairie PrimeVue --
SpeedDial
Sidebar
Button
MultiSelect
SelectButton
RadioButton

Version: 1.0

### Props

| Prop name        | Description | Type   | Values | Default |
| ---------------- | ----------- | ------ | ------ | ------- |
| selectedScenario | TODO        | object | -      |         |

### Methods

#### changeMapToOrtho

> Permet de changer la valeur de mapSelected en fonction du bouton cliqué

#### changeMapToPlan

> Permet de changer la valeur de mapSelected en fonction du bouton cliqué

#### switchTo2D

> TODO

#### switchTo3D

> TODO

#### updateScenarios

> Mise à jour des scénarios

### Events

| Event name      | Properties | Description |
| --------------- | ---------- | ----------- |
| icon-clicked    |            |
| change-building |            |
| reinit-view     |            |
| vue-2d          |            |
| vue-3d          |            |
| updateScenarios |            |

---

---

## SpeedDial

### Props

| Prop name          | Description | Type    | Values | Default      |
| ------------------ | ----------- | ------- | ------ | ------------ |
| model              |             | null    | -      |              |
| visible            |             | boolean | -      | false        |
| direction          |             | string  | -      | 'up'         |
| transitionDelay    |             | number  | -      | 30           |
| type               |             | string  | -      | 'linear'     |
| radius             |             | number  | -      | 0            |
| mask               |             | boolean | -      | false        |
| disabled           |             | boolean | -      | false        |
| hideOnClickOutside |             | boolean | -      | true         |
| buttonClass        |             | null    | -      |              |
| maskStyle          |             | null    | -      |              |
| maskClass          |             | null    | -      |              |
| showIcon           |             | string  | -      | 'pi pi-plus' |
| hideIcon           |             | null    | -      |              |
| rotateAnimation    |             | boolean | -      | true         |
| tooltipOptions     |             | null    | -      |              |
| style              |             | null    | -      |              |
| class              |             | null    | -      |              |
| aria-labelledby    |             | string  | -      | null         |
| aria-label         |             | string  | -      | null         |

### Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| click      |            |
| show       |            |
| hide       |            |
| focus      |            |
| blur       |            |

### Slots

| Name   | Description | Bindings |
| ------ | ----------- | -------- |
| button |             |          |

---

## Sidebar

### Props

| Prop name     | Description | Type    | Values | Default       |
| ------------- | ----------- | ------- | ------ | ------------- |
| visible       |             | boolean | -      | false         |
| position      |             | string  | -      | 'left'        |
| baseZIndex    |             | number  | -      | 0             |
| autoZIndex    |             | boolean | -      | true          |
| dismissable   |             | boolean | -      | true          |
| showCloseIcon |             | boolean | -      | true          |
| closeIcon     |             | string  | -      | 'pi pi-times' |
| modal         |             | boolean | -      | true          |
| blockScroll   |             | boolean | -      | false         |

### Events

| Event name     | Properties | Description |
| -------------- | ---------- | ----------- |
| update:visible |            |
| show           |            |
| hide           |            |
| after-hide     |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| header  |             |          |
| default |             |          |

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

---

## MultiSelect

### Props

| Prop name              | Description | Type    | Values | Default                 |
| ---------------------- | ----------- | ------- | ------ | ----------------------- |
| modelValue             |             | null    | -      |                         |
| options                |             | array   | -      |                         |
| optionLabel            |             | null    | -      |                         |
| optionValue            |             | null    | -      |                         |
| optionDisabled         |             | null    | -      |                         |
| optionGroupLabel       |             | null    | -      |                         |
| optionGroupChildren    |             | null    | -      |                         |
| scrollHeight           |             | string  | -      | '200px'                 |
| placeholder            |             | string  | -      |                         |
| disabled               |             | boolean | -      |                         |
| inputId                |             | string  | -      | null                    |
| inputProps             |             | null    | -      | null                    |
| panelClass             |             | string  | -      | null                    |
| panelStyle             |             | null    | -      | null                    |
| panelProps             |             | null    | -      | null                    |
| filterInputProps       |             | null    | -      | null                    |
| closeButtonProps       |             | null    | -      | null                    |
| dataKey                |             | null    | -      |                         |
| filter                 |             | boolean | -      |                         |
| filterPlaceholder      |             | string  | -      |                         |
| filterLocale           |             | string  | -      |                         |
| filterMatchMode        |             | string  | -      | 'contains'              |
| filterFields           |             | array   | -      | null                    |
| appendTo               |             | string  | -      | 'body'                  |
| display                |             | string  | -      | 'comma'                 |
| selectedItemsLabel     |             | string  | -      | '{0} items selected'    |
| maxSelectedLabels      |             | number  | -      | null                    |
| selectionLimit         |             | number  | -      | null                    |
| showToggleAll          |             | boolean | -      | true                    |
| loading                |             | boolean | -      | false                   |
| checkboxIcon           |             | string  | -      | 'pi pi-check'           |
| closeIcon              |             | string  | -      | 'pi pi-times'           |
| dropdownIcon           |             | string  | -      | 'pi pi-chevron-down'    |
| filterIcon             |             | string  | -      | 'pi pi-search'          |
| loadingIcon            |             | string  | -      | 'pi pi-spinner pi-spin' |
| removeTokenIcon        |             | string  | -      | 'pi pi-times-circle'    |
| selectAll              |             | boolean | -      | null                    |
| resetFilterOnHide      |             | boolean | -      | false                   |
| virtualScrollerOptions |             | object  | -      | null                    |
| autoOptionFocus        |             | boolean | -      | true                    |
| autoFilterFocus        |             | boolean | -      | false                   |
| filterMessage          |             | string  | -      | null                    |
| selectionMessage       |             | string  | -      | null                    |
| emptySelectionMessage  |             | string  | -      | null                    |
| emptyFilterMessage     |             | string  | -      | null                    |
| emptyMessage           |             | string  | -      | null                    |
| tabindex               |             | number  | -      | 0                       |
| aria-label             |             | string  | -      | null                    |
| aria-labelledby        |             | string  | -      | null                    |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| change            |            |
| focus             |            |
| blur              |            |
| before-show       |            |
| before-hide       |            |
| show              |            |
| hide              |            |
| filter            |            |
| selectall-change  |            |

### Slots

| Name        | Description | Bindings |
| ----------- | ----------- | -------- |
| value       |             | <br/>    |
| chip        |             |          |
| indicator   |             |          |
| header      |             | <br/>    |
| optiongroup |             | <br/>    |
| option      |             | <br/>    |
| emptyfilter |             |          |
| empty       |             |          |
| loader      |             |          |
| footer      |             | <br/>    |

---

## SelectButton

### Props

| Prop name       | Description | Type    | Values | Default |
| --------------- | ----------- | ------- | ------ | ------- |
| modelValue      |             | null    | -      |         |
| options         |             | array   | -      |         |
| optionLabel     |             | null    | -      |         |
| optionValue     |             | null    | -      |         |
| optionDisabled  |             | null    | -      |         |
| multiple        |             | boolean | -      |         |
| unselectable    |             | boolean | -      | false   |
| disabled        |             | boolean | -      |         |
| dataKey         |             | null    | -      |         |
| aria-labelledby |             | string  | -      | null    |

### Events

| Event name        | Properties                                     | Description |
| ----------------- | ---------------------------------------------- | ----------- |
| update:modelValue |                                                |
| focus             |                                                |
| blur              | **&lt;anonymous1&gt;** `undefined` - undefined |
| change            |                                                |

### Slots

| Name   | Description | Bindings |
| ------ | ----------- | -------- |
| option |             | <br/>    |

---

## RadioButton

### Props

| Prop name       | Description | Type           | Values | Default |
| --------------- | ----------- | -------------- | ------ | ------- |
| value           |             | null           | -      |         |
| modelValue      |             | null           | -      |         |
| name            |             | string         | -      | null    |
| disabled        |             | boolean        | -      | false   |
| inputId         |             | string         | -      | null    |
| inputClass      |             | string\|object | -      | null    |
| inputStyle      |             | object         | -      | null    |
| inputProps      |             | null           | -      | null    |
| aria-labelledby |             | string         | -      | null    |
| aria-label      |             | string         | -      | null    |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| click             |            |
| update:modelValue |            |
| change            |            |
| focus             |            |
| blur              |            |
