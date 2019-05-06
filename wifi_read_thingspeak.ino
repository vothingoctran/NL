#include <ESP8266WiFi.h>

char ssid[] = "THUY_TRANG" ;   
char pass[] = "12341234";   
int keyIndex = 0;            
WiFiClient  client;
#include "ThingSpeak.h"
int led = D5;
int fan = D3;

unsigned long myChannelNumber = 760890;
const char * myReadAPIKey = "6L866X7NFH7BNRLU";



void setup() {
  Serial.begin(115200);
  delay(100);

  WiFi.mode(WIFI_STA);

  ThingSpeak.begin(client);
  pinMode (led, OUTPUT);
digitalWrite (led,HIGH);
pinMode (fan, OUTPUT);
digitalWrite (fan,HIGH);
}

void loop() {

  Serial.println();
  Serial.println();
  Serial.print("Ket noi toi mang wifi ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi da ket noi");
  Serial.println("Dia chi IP: ");
  Serial.println(WiFi.localIP()); //In ra dia chi IP

  // Measure Signal Strength (RSSI) of Wi-Fi connection
  //long rssi = WiFi.RSSI();

  // Write value to Field 1 of a ThingSpeak Channel
  int httpCode = ThingSpeak.readIntField(myChannelNumber, 1, "6L866X7NFH7BNRLU");
  int httpCode1 = ThingSpeak.readIntField(myChannelNumber, 2, "6L866X7NFH7BNRLU");
  Serial.println(httpCode);
  Serial.println(httpCode1);
  // Wait 2 seconds to uodate the channel again
  delay(1000);
  if ( httpCode == 1){
    digitalWrite(led, HIGH);  
                            
  }
  else{
    digitalWrite(led, LOW);  
                              
  }delay(1000);
  if ( httpCode1 == 1){
    digitalWrite(fan, HIGH);  
                            
  }
  else{
    digitalWrite(fan, LOW);  
                              
  }
  
}
