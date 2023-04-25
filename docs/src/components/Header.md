---
sidebarDepth: 2
---

## menuComponent

> TODO

Author: Equipe du projet Oracle - ENSG, TSI

Since: 25.04.2023

Composants enfants :
-- Librairie PrimeVue --
Toolbar
SelectButton
Panel
CascadeSelect
MultiSelect
Button

Version: 1.0

### Methods

#### ret

> TODO

#### validation

> TODO

#### reinitialisation

> TODO

#### toggle

> TODO

##### Params

| Param name | Type | Description |
| ---------- | ---- | ----------- |
| event      |      |             |

#### getDossier

> Récupérer le nom des dossiers et les transmettre à la variable scenario

#### appelMethodeDansPanel

> TODO

#### emitSelectedScenarioChanged

> TODO

### Events

| Event name              | Properties | Description |
| ----------------------- | ---------- | ----------- |
| selectedScenarioChanged |            |

---

---

## Toolbar

### Props

| Prop name       | Description | Type   | Values | Default |
| --------------- | ----------- | ------ | ------ | ------- |
| aria-labelledby |             | string | -      | null    |

### Slots

| Name   | Description | Bindings |
| ------ | ----------- | -------- |
| start  |             |          |
| center |             |          |
| end    |             |          |

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

## Panel

### Props

| Prop name         | Description | Type    | Values | Default |
| ----------------- | ----------- | ------- | ------ | ------- |
| header            |             | string  | -      |         |
| toggleable        |             | boolean | -      |         |
| collapsed         |             | boolean | -      |         |
| toggleButtonProps |             | null    | -      | null    |

### Events

| Event name       | Properties | Description |
| ---------------- | ---------- | ----------- |
| update:collapsed |            |
| toggle           |            |

### Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| header  |             |          |
| icons   |             |          |
| default |             |          |

---

## CascadeSelect

### Props

| Prop name             | Description | Type           | Values | Default                 |
| --------------------- | ----------- | -------------- | ------ | ----------------------- |
| modelValue            |             | null           | -      |                         |
| options               |             | array          | -      |                         |
| optionLabel           |             | null           | -      |                         |
| optionValue           |             | null           | -      |                         |
| optionDisabled        |             | null           | -      |                         |
| optionGroupLabel      |             | null           | -      |                         |
| optionGroupChildren   |             | null           | -      |                         |
| placeholder           |             | string         | -      |                         |
| disabled              |             | boolean        | -      |                         |
| dataKey               |             | null           | -      |                         |
| inputId               |             | string         | -      | null                    |
| inputClass            |             | string\|object | -      | null                    |
| inputStyle            |             | object         | -      | null                    |
| inputProps            |             | null           | -      | null                    |
| panelClass            |             | string\|object | -      | null                    |
| panelStyle            |             | object         | -      | null                    |
| panelProps            |             | null           | -      | null                    |
| appendTo              |             | string         | -      | 'body'                  |
| loading               |             | boolean        | -      | false                   |
| dropdownIcon          |             | string         | -      | 'pi pi-chevron-down'    |
| loadingIcon           |             | string         | -      | 'pi pi-spinner pi-spin' |
| optionGroupIcon       |             | string         | -      | 'pi pi-angle-right'     |
| autoOptionFocus       |             | boolean        | -      | true                    |
| selectOnFocus         |             | boolean        | -      | false                   |
| searchLocale          |             | string         | -      | undefined               |
| searchMessage         |             | string         | -      | null                    |
| selectionMessage      |             | string         | -      | null                    |
| emptySelectionMessage |             | string         | -      | null                    |
| emptySearchMessage    |             | string         | -      | null                    |
| emptyMessage          |             | string         | -      | null                    |
| tabindex              |             | number         | -      | 0                       |
| aria-labelledby       |             | string         | -      | null                    |
| aria-label            |             | string         | -      | null                    |

### Events

| Event name        | Properties | Description |
| ----------------- | ---------- | ----------- |
| update:modelValue |            |
| change            |            |
| focus             |            |
| blur              |            |
| click             |            |
| group-change      |            |
| before-show       |            |
| before-hide       |            |
| hide              |            |
| show              |            |

### Slots

| Name      | Description | Bindings |
| --------- | ----------- | -------- |
| value     |             | <br/>    |
| indicator |             |          |

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
