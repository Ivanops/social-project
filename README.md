##
Dado un número suficientemente elevado de ojos, todos los errores se vuelven obvios.»
- Linus Torvalds

## Structure
LIFT:

L: Locating our code is easy

I: Identify code at a glance

F: Flat structure as long as we can

T: Try to stay DRY (Don’t Repeat Yourself) or T-DRY

component naming (chat-message:set-message-component)

https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#services

## Gulp
Some refactor to gulp suggestions

## Emit
Watch diagram
chat.controller 
chat.service
https://toddmotto.com/all-about-angulars-emit-broadcast-on-publish-subscribing/
https://dzone.com/articles/top-5-mistakes-angularjs-part-three

## http wrapper
using $q bad practice http already returns a promise
session service

## Observations Code
chat.controller: repeat code 268
chat.service: Lot of logic (use subscriber design pattern)

## suggestions
Jenkins
Protractor

## Concerns
chat.controller.js
$sceProvider.enabled(false)


-- Angular Documentation
Strict Contextual Escaping

Strict Contextual Escaping (SCE) is a mode in which AngularJS constrains bindings
to only render trusted values. Its goal is to assist in writing code in a way that (a)
is secure by default, and (b) makes auditing for security vulnerabilities such as XSS,
clickjacking, etc. a lot easier.

Can I disable SCE completely?

Yes, you can. However, this is strongly discouraged.
SCE gives you a lot of security benefits for little coding overhead.
It will be much harder to take an SCE disabled application and either secure it
on your own or enable SCE at a later stage.
It might make sense to disable SCE for cases where you have a lot of existing code
that was written before SCE was introduced and you're migrating them a module at a time.
Also do note that this is an app-wide setting, so if you are writing a library,
you will cause security bugs applications using it.
