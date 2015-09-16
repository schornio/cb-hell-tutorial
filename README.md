# Callback-hell tutorial for Stahlstadt.JS

## Inhalt

1. Quick and dirty
2. Promises
3. Generator Functions

## Versuchsaufbau

Aus `predictions.csv`:

    Name; Status; isAzorAhai;
    Tyrion; alive; false;
    Jon; alive; true;
    Stanis; alive; false;
    Daenerys; alive; true;

und `names.csv`:

    Vorname; Nachname;
    Tyrion; Lannister;
    Jon; Snow;
    Stanis; Baratheon;
    Daenerys; Targaryen;

mach `predictions.json`:

    [
      { vorname: 'Tyrion', nachname: 'Lannister', status: 'alive', isAzorAhai: false },
      { vorname: 'Jon', nachname: 'Snow', status: 'alive', isAzorAhai: true },
      { vorname: 'Stanis', nachname: 'Baratheon', status: 'alive', isAzorAhai: false },
      { vorname: 'Daenerys', nachname: 'Targaryen', status: 'alive', isAzorAhai: true }
    ]
