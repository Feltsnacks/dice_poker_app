<!---
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->

# cordova-plugin-contacts

Обеспечивает доступ к базе данных контактов устройства.

**Предупреждение**: сбор и использование данные контактов поднимает важные вопросы конфиденциальности. Политика конфиденциальности вашего приложения должна объяснять, как приложение использует контактные данные и передается ли она третьим лицам. Контактная информация считается конфиденциальной, потому что он показывает людей, с которыми общается человек. Таким образом в дополнение к политике конфиденциальности приложения, вы должны рассмотреть возможность предоставления уведомления в момент времени перед тем как приложение обращается к, или использует контактные данные, если операционная системы устройства не делает этого. Это уведомление должно обеспечивать ту же информацию, указанную выше, а также получение разрешения пользователя (например, путем представления выбора **OK** и **Нет, спасибо**). Обратите внимание, что некоторые магазины приложения могут требовать от приложения уведомления в момент доступа к данным и получить разрешение пользователя перед доступом к контактным данным. Четкая и понятная эргономика использования контактных данных помогает избежать недоразумений и ощущаемых злоупотреблений контактными данными. Для получения дополнительной информации пожалуйста, смотрите в руководстве конфиденциальности.

## Установка

    cordova plugin add cordova-plugin-contacts

### Особенности Firefox OS

Создайте **www/manifest.webapp** как описано в [Описание Манифеста][1]. Добавление соответствующих разрешений. Существует также необходимость изменить тип веб-приложения на «priviledged» - [Описание Манифеста][2]. **ВНИМАНИЕ**: Все привилегированные приложения применяют [Политику безопасности содержимого][3] которая запрещает встроенные скрипты. Инициализируйте приложение другим способом.

[1]: https://developer.mozilla.org/en-US/Apps/Developing/Manifest
[2]: https://developer.mozilla.org/en-US/Apps/Developing/Manifest#type

[3]: https://developer.mozilla.org/en-US/Apps/CSP

    "type": "privileged",
    "permissions": {
        "contacts": {
            "access": "readwrite",
            "description": "Describe why there is a need for such permission"
        }
    }

### Совместимости Windows

Любые контакты, вернулся из `find` и `pickContact` методы являются только для чтения, поэтому приложение не может изменять их. `find`метод доступен только на устройствах Windows Phone 8.1.

### Совместимости Windows 8

Windows 8 Контакты являются readonly. Через контакты Cordova API не являются queryable/для поиска, вы должны сообщить пользователю выбрать контакт как вызов contacts.pickContact, который откроет приложение «Люди», где пользователь должен выбрать контакт. Любые контакты вернулся, readonly, поэтому ваше приложение не может изменять их.

## navigator.contacts

### Методы

- navigator.contacts.create
- navigator.contacts.find
- navigator.contacts.pickContact

### Объекты

- Contact
- ContactName
- ContactField
- ContactAddress
- ContactOrganization
- ContactFindOptions
- ContactError
- ContactFieldType

## navigator.contacts.create

Метод `navigator.contacts.create` является синхронным, и возвращает новый объект `Contact`.

Этот метод не сохраняет объект контакта в базе данных контактов устройства, для которого необходимо вызвать метод `Contact.save`.

### Поддерживаемые платформы

- Android
- BlackBerry 10
- Firefox OS
- iOS
- Windows Phone 7 и 8

### Пример

    var myContact = navigator.contacts.create({"displayName": "Test User"});

## navigator.contacts.find

Метод `navigator.contacts.find` выполняется асинхронно, запрашивая базу контактов устройства и возвращая массив объектов `Contact`. Полученные объекты передаются в функцию обратного вызова `contactSuccess`, указанную в параметре **contactSuccess** .

Параметр **contactFields** указывает поля, чтобы использоваться в качестве квалификатора Поиск. Нулевой длины **contactFields** параметр является недопустимым и приводит к `ContactError.INVALID_ARGUMENT_ERROR` . Значение **contactFields** `"*"` возвращает все поля контактов.

Строка **ContactFindOptions.filter** может использоваться как фильтр поиска при запросах к базе данных контактов. Если указано, то к каждому полю, указанному в параметре **contactFields**, применяется фильтр частичного поиска без учета регистра. Если есть совпадение для _любого_ из указанных полей, контакт возвращается. Использование параметра **contactFindOptions.desiredFields** для управления свойства контакта должны быть возвращены обратно.

### Параметры

- **contactSuccess**: Функция обратного вызова вызываемая в случае успешного поиска, с параметром в виде массива объектов Contact возвращенных из базы данных контактов. [Обязательный]

- **contactError**: Функция обратного вызова, вызывается при возникновении ошибки. [Опционально]

- **contactFields**: контакт поля для использования в качестве квалификатора Поиск. _(DOMString[])_ [Требуется]

- **contactFindOptions**: Параметры поиска для фильтрации filter navigator.contacts. [Опционально] Ключи включают:

- **filter**: Строка поиска используемая для поиска по navigator.contacts. _(DOMString)_ (по умолчанию: `""`)

- **multiple**: Определяет если операция поиска возвращает несколкько navigator.contacts. _(Булевое)_ (По умолчанию: `false`)

  - **desiredFields**: контакт поля возвращается обратно. Если указан, в результате `Contact` объект только функции значения для этих полей. _(DOMString[])_ [Опционально]

### Поддерживаемые платформы

- Android
- BlackBerry 10
- Firefox OS
- iOS
- Windows Phone 7 и 8
- Windows (только для устройств на Windows Phone 8.1)

### Пример

    function onSuccess(contacts) {
        alert('Found ' + contacts.length + ' contacts.');
    };

    function onError(contactError) {
        alert('onError!');
    };

    // find all contacts with 'Bob' in any name field
    var options      = new ContactFindOptions();
    options.filter   = "Bob";
    options.multiple = true;
    options.desiredFields = [navigator.contacts.fieldType.id];
    var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
    navigator.contacts.find(fields, onSuccess, onError, options);

### Совместимости Windows

- `__contactFields__`не поддерживается и будет игнорироваться. `find`метод всегда будет пытаться соответствовать имя, адрес электронной почты или номер телефона контакта.

## navigator.contacts.pickContact

`navigator.contacts.pickContact`Метод запускает контакт выбора, чтобы выбрать один контакт. Результирующий объект передается в `contactSuccess` функции обратного вызова, указанный параметром **contactSuccess** .

### Параметры

- **contactSuccess**: успех функция обратного вызова вызывается с одним объектом контакта. [Требуется]

- **contactError**: Функция обратного вызова, вызывается при возникновении ошибки. [Опционально]

### Поддерживаемые платформы

- Android
- iOS
- Windows Phone 8
- Windows 8
- Windows

### Пример

    navigator.contacts.pickContact(function(contact){
            console.log('The following contact has been selected:' + JSON.stringify(contact));
        },function(err){
            console.log('Error: ' + err);
        });

## Contact

Объект `Contact` представляет контакт пользователя. Контакты могут быть созданы, сохранены или удалены из базы данных контактов устройства. Контакты также могут быть получены (индивидуально или массово) из базы данных путем вызова метода `navigator.contacts.find`.

**Примечание**: не все поля контактов, перечисленных выше, поддерживаются на каждой платформе устройства. Пожалуйста, проверьте раздел _Особенности_ каждой платформы для детальной информации.

### Параметры

- **ID**: глобальный уникальный идентификатор. _(DOMString)_

- **displayName**: имя этого контакта, подходящую для отображения пользователю. _(DOMString)_

- **name**: объект, содержащий все компоненты имени человека. _(ContactName)_

- **nickname**: обычное имя, по которому определяется контакт. _(DOMString)_

- **phoneNumbers**: массив со всеми номерами контактных телефонов. _(ContactField[])_

- **emails**: массив всех адресов электронной почты контакта. _(ContactField[])_

- **addresses**: массив всех адресов контакта. _(ContactAddress[])_

- **IMS**: массив всех IM-адресов контакта. _(ContactField[])_

- **organizations**: массив всех организаций контакта. _(ContactOrganization[])_

- **birthday**: день рождения контакта. _(Дата)_

- **note**: Текстовая заметка о контакте. _(DOMString)_

- **photos**: массив фотографий контакта. _(ContactField[])_

- **categories**: массив всех определенных пользователем категории, связанных с контактом. _(ContactField[])_

- **urls**: массив веб-страниц, связанных с контактом. _(ContactField[])_

### Методы

- **clone**: возвращает новый объект `Contact`, являющийся глубокой копией вызывающего объекта с значением свойства `id` равным `null`.

- **remove**: удаляет контакт из базы данных контактов устройства, в противном случае выполняет обратный вызов ошибки с объектом `ContactError` описывающим ошибку.

- **save**: сохраняет новый контакт в базе данных контактов устройства или обновляет существующий контакт, если контакт с тем же **id** уже существует.

### Поддерживаемые платформы

- Amazon Fire OS
- Android
- BlackBerry 10
- Firefox OS
- iOS
- Windows Phone 7 и 8
- Windows 8
- Windows

### Пример сохранения

    function onSuccess(contact) {
        alert("Save Success");
    };

    function onError(contactError) {
        alert("Error = " + contactError.code);
    };

    // create a new contact object
    var contact = navigator.contacts.create();
    contact.displayName = "Plumber";
    contact.nickname = "Plumber";            // specify both to support all devices

    // populate some fields
    var name = new ContactName();
    name.givenName = "Jane";
    name.familyName = "Doe";
    contact.name = name;

    // save to device
    contact.save(onSuccess,onError);

### Пример клонирования

        // clone the contact object
        var clone = contact.clone();
        clone.name.givenName = "John";
        console.log("Original contact name = " + contact.name.givenName);
        console.log("Cloned contact name = " + clone.name.givenName);

### Пример удаления

    function onSuccess() {
        alert("Removal Success");
    };

    function onError(contactError) {
        alert("Error = " + contactError.code);
    };

    // remove the contact from the device
    contact.remove(onSuccess,onError);

### Особенности Android 2.X

- **categories**: не поддерживается на устройствах Android 2.X, возвращая `null`.

### Особенности BlackBerry 10

- **ID**: присвоенный устройства при сохранении контакта.

### Особенности Firefox OS

- **categories**: частично поддерживается. Поля **pref** и **type** возвращают `null`

- **ims**: Не поддерживается

- **photos**: Не поддерживается

### Особенности iOS

- **displayName**: не поддерживается на iOS, возвращая `null` Если `ContactName` не указан, в этом случае он возвращает составное имя, **nickname** или `""` , соответственно.

- **birthday**: Должен быть указан как объект JavaScript `Date`, таким же образом, значение этого поля и возвращается.

- **photos**: Возвращает URL-адрес файла изображения, которое хранится во временном каталоге приложения. Содержание временного каталога удаляются при выходе из приложения.

- **categories**: это свойство в настоящее время не поддерживается, возвращая`null`.

### Особенности Windows Phone 7 и 8

- **displayName**: при создании контакта, значение, указанное в параметре отличается от отображаемого имени полученного при поиске контакта.

- **urls**: при создании контакта, пользователи могут ввести и сохранить более чем одного веб-адрес, но только один доступен при поиске контакта.

- **phoneNumbers**: параметр _pref_ не поддерживается. _type_ не поддерживается в операции _find_ . Только один `phoneNumber` допускается для каждого _type_.

- **emails**: параметр _pref_ не поддерживается. Домашний и рабочий email ссылаются на одну и ту же запись электронной почты. Разрешена только одна запись для каждого значения _type_.

- **addresses**: поддерживает только рабочий и домашний/личный _type_. Записи типа _type_ home и personal ссылаются на одну и ту же запись адреса. Разрешена только одна запись для каждого значения _type_.

- **organizations**: только одна организация разрешена и она не поддерживает атрибуты _pref_, *type*и _department_ .

- **note**: не поддерживается, возвращая`null`.

- **ims**: не поддерживается, возвращая `null`.

- **birthdays**: не поддерживается, возвращая`null`.

- **categories**: не поддерживается, возвращая`null`.

### Совместимости Windows

- **фотографии**: Возвращает URL-адрес файла изображения, которое хранится во временном каталоге приложения.

- **birthdays**: не поддерживается, возвращая`null`.

- **categories**: не поддерживается, возвращая`null`.

## ContactAddress

Объект `ContactAddress` хранит свойства для одного адреса контакта. Объект `Contact` может включать более чем один адрес в массиве `ContactAddress[]`.

### Параметры

- **pref**: Установите значение `true` если `ContactAddress` содержит предпочитаемое для пользователя значение. _(логический)_

- **type**: строка, указывающая тип поля, _home_, например. _(DOMString)_

- **formatted**: полный адрес отформатированый для отображения. _(DOMString)_

- **streetAddress**: полный почтовый адрес. _(DOMString)_

- **locality**: город или населенный пункт. _(DOMString)_

- **region**: штат или регион. _(DOMString)_

- **postalCode**: почтовый индекс или почтовый код. _(DOMString)_

- **country**: название страны. _(DOMString)_

### Поддерживаемые платформы

- Amazon Fire OS
- Android
- BlackBerry 10
- Firefox OS
- iOS
- Windows Phone 7 и 8
- Windows 8
- Windows

### Пример

    // display the address information for all contacts

    function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            for (var j = 0; j < contacts[i].addresses.length; j++) {
                alert("Pref: "         + contacts[i].addresses[j].pref          + "\n" +
                    "Type: "           + contacts[i].addresses[j].type          + "\n" +
                    "Formatted: "      + contacts[i].addresses[j].formatted     + "\n" +
                    "Street Address: " + contacts[i].addresses[j].streetAddress + "\n" +
                    "Locality: "       + contacts[i].addresses[j].locality      + "\n" +
                    "Region: "         + contacts[i].addresses[j].region        + "\n" +
                    "Postal Code: "    + contacts[i].addresses[j].postalCode    + "\n" +
                    "Country: "        + contacts[i].addresses[j].country);
            }
        }
    };

    function onError(contactError) {
        alert('onError!');
    };

    // find all contacts
    var options = new ContactFindOptions();
    options.filter = "";
    var filter = ["displayName", "addresses"];
    navigator.contacts.find(filter, onSuccess, onError, options);

### Особенности Android 2.X

- **ап**: не поддерживается, возвращая `false` на устройствах Android 2.X.

### Особенности BlackBerry 10

- **ап**: не поддерживается на устройствах BlackBerry, возвращая`false`.

- **тип**: частично поддерживается. Контакт может храниться только один из _работы_ и _дома_ типа адреса.

- **Формат**: частично поддерживается. Возвращает объединение всех полей адреса BlackBerry.

- **streetAddress**: поддерживается. Возвращает объединение и BlackBerry **Адрес1** **Адрес2** поля адреса.

- **населенный пункт**: поддерживается. Хранится в поле адрес **город** BlackBerry.

- **регион**: поддерживает. Хранится в поле адреса **stateProvince** BlackBerry.

- **postalCode**: поддерживается. Хранится в поле адреса **zipPostal** BlackBerry.

- **страна**: поддерживается.

### Особенности Firefox OS

- **formatted**: На данный момент не поддерживается

### Особенности iOS

- **pref**: не поддерживается на устройствах iOS, возвращая `false`.

- **formatted**: На данный момент не поддерживается.

### Совместимости Windows 8

- **pref**: Не поддерживается

### Совместимости Windows

- **pref**: Не поддерживается

## ContactError

Объект `ContactError` возвращается пользователю через функцию обратного вызова `contactError` в случае возникновении ошибки.

### Параметры

- **code**: один из стандартных кодов ошибок, перечисленных ниже.

### Константы

- `ContactError.UNKNOWN_ERROR` (code 0)
- `ContactError.INVALID_ARGUMENT_ERROR` (code 1)
- `ContactError.TIMEOUT_ERROR` (code 2)
- `ContactError.PENDING_OPERATION_ERROR` (code 3)
- `ContactError.IO_ERROR` (code 4)
- `ContactError.NOT_SUPPORTED_ERROR` (code 5)
- `ContactError.PERMISSION_DENIED_ERROR` (code 20)

## ContactField

Объект `ContactField` является многократно используемым компонентом, который представляет контактные поля общего назначения. Каждый объект `ContactField` содержит свойства `value` , `type`, и `pref`. Объект `Contact` имеет несколько свойств сохраняющих данные в массиве `ContactField[]`, такие как номера телефонов и адреса электронной почты.

В большинстве случаев не существует заранее определенные значения для атрибута **type** объекта `ContactField`. Например номер телефона можно указать значения **type** _home_, _work_, _mobile_, _iPhone_ или любого другого значения, поддерживаемые базы данных контактов на платформе конкретного устройства . Однако, для `Contact` поля **photos**, поле **type** указывает формат возвращаемого изображения: **URL-адрес,** когда атрибут **value** содержит URL-адрес изображения фото или _base64_ , если **value** содержит строку изображения в кодировке base64.

### Параметры

- **type**: строка, указывающая тип поля, _home_, например. _(DOMString)_

- **value**: значение поля, например номер телефона или адрес электронной почты. _(DOMString)_

- **pref**: набор `true` Если `ContactField` содержит значение предпочитаемое пользователем. _(логический)_

### Поддерживаемые платформы

- Amazon Fire OS
- Android
- BlackBerry 10
- Firefox OS
- iOS
- Windows Phone 7 и 8
- Windows 8
- Windows

### Пример

        // create a new contact
        var contact = navigator.contacts.create();

        // store contact phone numbers in ContactField[]
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', '212-555-1234', false);
        phoneNumbers[1] = new ContactField('mobile', '917-555-5432', true); // preferred number
        phoneNumbers[2] = new ContactField('home', '203-555-7890', false);
        contact.phoneNumbers = phoneNumbers;

        // save the contact
        contact.save();

### Особенности Android

- **pref**: не поддерживается, возвращая `false`.

### Особенности BlackBerry 10

- **type**: частично поддерживается. Используется для телефонных номеров.

- **value**: поддерживается.

- **pref**: не поддерживается, возвращая `false`.

### Особенности iOS

- **pref**: не поддерживается, возвращая `false`.

### Причуды Windows8

- **pref**: не поддерживается, возвращая `false`.

### Совместимости Windows

- **pref**: не поддерживается, возвращая `false`.

## ContactName

Содержит различную информации об имени объекта `Contact`.

### Параметры

- **formatted**: полное имя контакта. _(DOMString)_

- **familyName**: семья имя контакта. _(DOMString)_

- **givenName**: имя контакта. _(DOMString)_

- **middleName**: отчество контакта. _(DOMString)_

- **honorificPrefix**: префикс имени контакта (например, _г-н_ или _д-р_) _(DOMString)_

- **honorificSuffix**: суффикс имени контакта (например, _эсквайр_). _(DOMString)_

### Поддерживаемые платформы

- Amazon Fire OS
- Android 2.X
- BlackBerry 10
- Firefox OS
- iOS
- Windows Phone 7 и 8
- Windows 8
- Windows

### Пример

    function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            alert("Formatted: "  + contacts[i].name.formatted       + "\n" +
                "Family Name: "  + contacts[i].name.familyName      + "\n" +
                "Given Name: "   + contacts[i].name.givenName       + "\n" +
                "Middle Name: "  + contacts[i].name.middleName      + "\n" +
                "Suffix: "       + contacts[i].name.honorificSuffix + "\n" +
                "Prefix: "       + contacts[i].name.honorificSuffix);
        }
    };

    function onError(contactError) {
        alert('onError!');
    };

    var options = new ContactFindOptions();
    options.filter = "";
    filter = ["displayName", "name"];
    navigator.contacts.find(filter, onSuccess, onError, options);

### Особенности Android

- **formatted**: частично поддерживается и только для чтения. Возвращает объединение значений `honorificPrefix`, `givenName`, `middleName`, `familyName`, и `honorificSuffix`.

### Особенности BlackBerry 10

- **formatted**: частично поддерживается. Возвращает объединение полей BlackBerry **firstName** и **lastName** .

- **familyName**: поддерживается. Хранится в поле **lastName** BlackBerry.

- **givenName**: поддерживается. Хранится в поле **firstName** BlackBerry.

- **middleName**: не поддерживается, возвращая `null`.

- **honorificPrefix**: не поддерживается, возвращая `null`.

- **honorificSuffix**: не поддерживается, возвращая `null`.

### Особенности Firefox OS

- **formatted**: частично поддерживается и только для чтения. Возвращает объединение значений `honorificPrefix`, `givenName`, `middleName`, `familyName`, и `honorificSuffix`.

### Особенности iOS

- **formatted**: частично поддерживается. Возвращает составное имя iOS, но только для чтения.

### Совместимости Windows 8

- **Формат**: это единственное имя свойства и идентичен `displayName` , и`nickname`

- **familyName**: не поддерживается

- **givenName**: не поддерживается

- **отчество**: не поддерживается

- **honorificPrefix**: не поддерживается

- **honorificSuffix**: не поддерживается

### Совместимости Windows

- **Формат**: это же`displayName`

## ContactOrganization

Объект `ContactOrganization` сохраняет свойства организации контакта. A объект `Contact` хранит один или больше объектов `ContactOrganization` в массиве.

### Параметры

- **pref**: Установите в `true` если `ContactOrganization` содержит значение предпочитаемое пользователем. _(логический)_

- **type**: строка, указывающая тип поля, _home_, например. \_(DOMString)

- **name**: название организации. _(DOMString)_

- **department**: Отдел в котором работает контакт. _(DOMString)_

- **title**: должность контакта в организации. _(DOMString)_

### Поддерживаемые платформы

- Android
- BlackBerry 10
- Firefox OS
- iOS
- Windows Phone 7 и 8
- Windows (только Windows 8.1 и 8.1 Windows Phone устройств)

### Пример

    function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; i++) {
            for (var j = 0; j < contacts[i].organizations.length; j++) {
                alert("Pref: "      + contacts[i].organizations[j].pref       + "\n" +
                    "Type: "        + contacts[i].organizations[j].type       + "\n" +
                    "Name: "        + contacts[i].organizations[j].name       + "\n" +
                    "Department: "  + contacts[i].organizations[j].department + "\n" +
                    "Title: "       + contacts[i].organizations[j].title);
            }
        }
    };

    function onError(contactError) {
        alert('onError!');
    };

    var options = new ContactFindOptions();
    options.filter = "";
    filter = ["displayName", "organizations"];
    navigator.contacts.find(filter, onSuccess, onError, options);

### Особенности Android 2.X

- **pref**: не поддерживается устройствами Android 2.X, возвращая `false`.

### Особенности BlackBerry 10

- **pref**: не поддерживается на устройствах BlackBerry, возвращая `false`.

- **type**: не поддерживается на устройствах BlackBerry, возвращая `null`.

- **name**: частично поддерживается. Первый название организации хранится в поле **company** BlackBerry.

- **department**: не поддерживается, возвращая `null`.

- **title**: частично поддерживается. Первый должность в организации хранится в поле **jobTitle** BlackBerry.

### Особенности Firefox OS

- **pref**: Не поддерживается

- **type**: Не поддерживается

- **department**: Не поддерживается

- Поля **name** и **title** хранятся в полях **org** and **jobTitle**.

### Особенности iOS

- **pref**: не поддерживается на устройствах iOS, возвращая `false`.

- **type**: не поддерживается на устройствах iOS, возвращая `null`.

- **name**: частично поддерживается. Первое название организации хранится в поле **kABPersonOrganizationProperty** iOS.

- **department**: частично поддерживается. Имя первого отдела хранится в поле **kABPersonDepartmentProperty** iOS.

- **title**: частично поддерживается. Первая должность хранится в поле **kABPersonJobTitleProperty** iOS.

### Совместимости Windows

- **pref**: не поддерживается, возвращая `false`.

- **тип**: не поддерживается, возвращая`null`.
