var data = [{
	"intentName": "what",
	"attributes": [
		{
			"name": "name",
			"value": "Wojtek"
		},
        {
            "name": "surname",
            "value": "Nowak"
        },
        {
            "name": "nationality",
            "value": "Polish"
        },
		{
			"name": "age",
			"value": "20"
		},
        {
            "name": "number",
            "value": "+48123456789"
        }
	]
}, {
	"intentName": "travel",
	"attributes": [
        {
			"name": "destination",
			"value": "Chicago"
		},
		{
			"name": "date",
			"value": "Monday"
		},
        {
            "name": "carrier",
            "value": "WizzAir"
        }
	]
},{
    "intentName": "health",
    "attributes": [
    {
        "name":"blood",
        "value":"RH+"
    }
    ]
}];

var forms = ['FormPersonal', 'FormPlane', 'FormHealth'];

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
        console.log( response );
        load_data = true;
        loaded_data = response; // server response        
        for(var i=0; i<data.length; i++){
            for(var j=0; j<response.length; j++){
                console.log(data[i]['intentName'] + " " + response[j]['intentName']);
                if(data[i]['intentName'] == response[j]['intentName']){
                    
                    for(var k=0; k<response[j]["attributes"].length; k++){
                        for(var l=0; l<data[i]["attributes"].length; l++){
                            console.log(data[i]["attributes"][l]["name"] + " " + response[j]["attributes"][k]["name"]);
                            console.log(data[i]["attributes"][l]["name"] + " " + response[j]["attributes"][k]["name"]);
                            if(data[i]["attributes"][l]["name"] == response[j]["attributes"][k]["name"]){
                                data[i]["attributes"][l]["value"] = response[j]["attributes"][k]["value"];
                                break;
                            }
                        }
                    }
                    break;
                }
            }
            
        }
        console.log(data);
        showData();
    },
    error: function(jqXHR, exception) { console.log( jqXHR );  console.log( exception );},
});

function showData(){
    for(var i=0; i < forms.length; i++){
        const p = data[i]["attributes"].map((e) => <FormElement name={e["name"]} defaultValue={e["value"]} key={e["name"]} />);
        ReactDOM.render(
            <div>{p}</div>,
            document.getElementById(forms[i])
        );
    }
}

$( "#saveButton" ).click(function() {
    for(var i=0;  i < data.length; i++){
        for(var j=0; j < data[i]["attributes"].length; j++){
            data[i]["attributes"][j]["value"] = $("#"+data[i]["attributes"][j]["name"]).val();
        }
    }
    var to_send = JSON.stringify(data, null, 2);
    $.ajax({
        url: 'https://c85d0367.ngrok.io/api/web/v1/intents',
        //crossDomain: true,
        type: 'PUT',
        data: to_send,
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            alert('Load was performed.');
      }
    });
});

