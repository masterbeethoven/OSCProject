
public var RemoteIP : String = "127.0.0.1"; //local host
public var SendToPort : int = 8000; //the port sending data from
public var ListenerPort : int = 9000; //the port listening on
public var controller : Transform;
public var gameReceiver = "Cube"; 
private var handler : Osc;

private var yRot : int = 0; //the rotation around the y axis
private var xRot : int = 0;
private var bTrigger : int = 1; //b trigger

public function Start ()
{
	//Initializes on start up to listen for messages
	//make sure this game object has both UDPPackIO and OSC script attached

	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(RemoteIP, SendToPort, ListenerPort);
	handler = GetComponent("Osc");
	handler.init(udp);
	handler.SetAllMessageHandler(AllMessageHandler);

}
Debug.Log("Running");

function Update () {
	var go = GameObject.Find(gameReceiver);
	go.transform.Rotate(0, yRot, 0);
	//go.transform.(xRot,0,0);
	go.transform.position += (Vector3(xRot, 0, 0));
}

//These functions are called when messages are received
//Access values via: oscMessage.Values[0], oscMessage.Values[1], etc

public function AllMessageHandler(oscMessage: OscMessage){


	var msgString = Osc.OscMessageToString(oscMessage); //the message and value combined
	var msgAddress = oscMessage.Address; //the message parameters
	var msgValue = oscMessage.Values[0]; //the message value
	Debug.Log(msgString); //log the message and values coming from OSC

	//FUNCTIONS YOU WANT CALLED WHEN A SPECIFIC MESSAGE IS RECEIVED
	switch (msgAddress){
		default:
			Rotate(msgValue);
			break;
	}

}


//FUNCTIONS CALLED BY MATCHING A SPECIFIC MESSAGE IN THE ALLMESSAGEHANDLER FUNCTION
public function Rotate(msgValue) : void //rotate the cube around its axis
{
	yRot = msgValue;
	xRot= msgValue;
}

