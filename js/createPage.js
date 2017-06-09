var data = [{
	"intentName": "what",
	"attributes": [
		{
			"name": "Name",
			"value": "Wojtek"
		},
        {
            "name": "Surname",
            "value": "Nowak"
        },
        {
            "name": "Nationality",
            "value": "Polish"
        },
		{
			"name": "Age",
			"value": "20"
		},
        {
            "name": "Number",
            "value": "+48123456789"
        }
	]
}, {
	"intentName": "plane",
	"attributes": [
        {
			"name": "Destination",
			"value": "Chicago"
		},
		{
			"name": "Date",
			"value": "Monday"
		},
        {
            "name": "Carrier",
            "value": "WizzAir"
        }
	]
}];

var forms = ['FormPersonal', 'FormPlane'];

function FormElement(props){
            return(
                <div className="form-group">
                    <label for="inputEmail3" className="col-sm-2 control-label">{props.name}</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" id={props.name} defaultValue={props.defaultValue} />
                    </div>
                </div>
          );
        }

var load_data = false;
var loaded_data = 0;
        
$.ajax({
    url: "https://c85d0367.ngrok.io/api/web/v1/intents",
    type: "GET",
    //crossDomain: true,
    dataType: "json",
    success: function( response ) {
        load_data = true;
        loaded_data = response; // server response
        console.log(response);
    },
    error: function(jqXHR, exception) { console.log( jqXHR );  console.log( exception );},
});

for(var i=0; i < forms.length; i++){
    const p = data[i]["attributes"].map((e) => <FormElement name={e["name"]} defaultValue={e["value"]} key={e["name"]} />);
    ReactDOM.render(
        <div>{p}</div>,
        document.getElementById(forms[i])
    );
}

$( "#saveButton" ).click(function() {
    $('#'+form[i]+' > input').each(function () { /* ... */ });
});

