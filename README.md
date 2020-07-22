# FirstAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3.

## Add a component

```java
// install angular-CLI
npm install -g @angular/cli  
// create a project
ng new my-app
// add a component in app folder
ng generate component header
// add a component in sub-folder
ng generate component posts/post-list
```



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Angular Binding

### Property Binding

> Attributes and Properties are not the same.
>
> Attributes is from html. They initialize the DOM properties and they are done. They can never be changed once they are initialized.
>
> Property values however can change.

Data flow: component -> template.

```html
<input [id]="myId" type="text"/>
```

```typescript
export class TestComponent {
    public myId = "testID";  // bind this to the input id
}
```

### Class Binding

```html
<h2 [class]="sucessClass">asdsad</h2>
```

```typescript
export class TestComponent {
	public sucessClass = "sucessClass";  // bind this to the input id
}
```

Use `ngClass`

```html
<h2 [ngClass]="messageClasses">ead</h2>
```

```typescript
export class TestComponent {
    public hasError = XX;
    public isSpecial = XX;
	public messageClasses = {
        "text-success": !this.hasError,
        "text-danger": this.hasError,
        "text-special": this.isSpecial
    }
}
```

### Event Binding

Data flow: Template -> Component.

```html
<button (click)="onClick($event)">Greet</button>
```

```typescript
export class TestComponent {
    public name = "yilin";
    onClick(event) {
        console.log("hello");
    }
}
```

### Template Reference Variable

```html
<input #myInput type="text"/>
<Button (click)="logMessage(myInput.value)">Log</Button>
```

```typescript
export class TestComponent {
    logMessage(val) {
        console.log(val);
    }
}
```

### Two Way Binding

```html
<input type="text" [(ngModel)]="name" />
{{name}}
```

```typescript
export class TestComponent {
    public name = "";
}
```

### Work with forms

```html
<form  #userForm="ngForm">
    <input name="first_name" ngModel />
</form>
{{ userForm.value | json }}
```



