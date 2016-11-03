/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "A heavy load on your roof rack will:": [
            "Reduce stability",
            "Improve the road holding",
            "Make the steering lighter",
            "Reduce the stopping distance"
        ]
    },
    {
        "Why should you switch off your rear fog lights when the fog has cleared?": [
            "To prevent dazzling following drivers",
            "To allow your headlights to work",
            "To stop the engine losing power",
            "To stop draining the battery"
        ]
    },
    {
        "What style of driving causes increased risk to everyone?": [
            "Competitive",
            "Considerate",
            "Defensive",
            "Responsible"
        ]
    },
    {
        "The solid white line along the side of the road:": [
            "Shows the edge of the carriageway",
            "Means no parking",
            "Shows the approach to a hazard",
            "Means no overtaking"
        ]
    },
    {
        "What will reduce the risk of neck injury resulting from a collision?": [
            "A properly adjusted head restraint",
            "An air-sprung seat",
            "A collapsible steering wheel",
            "Anti-lock brakes"
        ]
    },
    {
        "A casualty has an injured arm. They can move it freely but it is bleeding. Why should you get them to keep it in a raised position?": [
            "It will help to reduce the blood flow",
            "Because it will ease the pain",
            "To stop them touching other people",
            "It will help them to be seen more easily"
        ]
    },
    {
        "When should you use hazard warning lights?": [
            "When your vehicle has broken down and is causing an obstruction",
            "When you are double-parked on a two way road",
            "When warning oncoming traffic that you intend to stop",
            "When your direction indicators are not working"
        ]
    },
    {
        "Excessive or uneven tyre wear can be caused by faults in the:": [
            "Suspension",
            "Gearbox",
            "Engine",
            "Exhaust system"
        ]
    },
    {
        "You want to turn left at a junction where the view of the main road is restricted. What should you do?": [
            "Approach slowly and edge out until you can see more clearly",
            "Stay well back and wait to see if something comes",
            "Stop and apply the handbrake even if the road is clear",
            "Build up your speed so that you can emerge quickly"
        ]
    },
    {
        "The left-hand lane of a motorway should be used for:": [
            "Normal driving",
            "Breakdowns and emergencies only",
            "Slow vehicles only",
            "Overtaking slower traffic in the other lanes"
        ]
    },
    {
        "You're in collision with another moving vehicle. Someone is injured and your vehicle is damaged. What information should you find out?": [
            "The other driver's name, address and telephone number",
            "Whether the other driver is licensed to drive",
            "The destination of the other driver",
            "The occupation of the other driver"
        ]
    },
    {
        "How will a school crossing patrol signal you to stop?": [
            "By displaying a stop sign",
            "By pointing to children on the opposite pavement",
            "By displaying a red light",
            "By giving you an arm signal"
        ]
    },
    {
        "You are driving along a road that has a cycle lane. The lane is marked by a solid white line. This means that during its period of operation:": [
            "You must not drive in that lane",
            "The lane may be used for parking your car",
            "The lane may be used when necessary",
            "You may drive in that lane at any time"
        ]
    },
    {
        "You want to reverse into a side road. You are not sure that the area behind your car is clear. What should you do?": [
            "Get out and check",
            "Look through the rear window only",
            "Check the mirrors only",
            "Carry on, assuming it is clear"
        ]
    },
    {
        "You have to leave valuables in your car. It would be safer to:": [
            "Lock them out of sight",
            "Put them in a carrier bag",
            "Park near a school entrance",
            "Park near a bus stop"
        ]
    },
    {
        "You are driving behind a large goods vehicle. It signals left but steers to the right. You should:": [
            "Slow down and let the vehicle turn",
            "Overtake on the right of it",
            "Drive on, keeping to the left",
            "Hold your speed and sound your horn"
        ]
    },
    {
        "You get a puncture on the motorway. You manage to get your vehicle onto the hard shoulder. You should:": [
            "Use the emergency telephone and call for assistance",
            "Change the wheel yourself immediately",
            "Try to wave down another vehicle for help",
            "Only change the wheel if you have a passenger to help you"
        ]
    },
    {
        "What does the solid white line at the side of the road indicate?": [
            "Edge of the carriageway",
            "Traffic lights ahead",
            "Footpath on the left"
            "Cycle path"
        ]
    },
    {
        "You are stopped at a red traffic light behind a cyclist. When the traffic lights change, what should you do?": [
            "Allow the cyclist time and room",
            "Try to move off before the cyclist",
            "Turn right but give the cyclist room",
            "Tap your horn and drive through first"
        ]
    },
    {
        "How can driving in an ecosafe manner help protect the environment?": [
            "By reducing exhaust emissions",
            "Through the legal enforcement of speed regulations",
            "Through increased fuel bills",
            "By increasing the number of cars on the road"
        ]
    },
    {
        "You are waiting to emerge from a junction. The windscreen pillar is restricting your view. What should you be particularly aware of?": [
            "Motorcyclists",
            "Lorries",
            "Buses",
            "Coaches"
        ]
    },
    {
        "You are driving along a dual carriageway and a van is ahead of you in the next lane. Suddenly the van cuts in close in front of you. What should you do?": [
            "Drop back to leave the correct separation distance",
            "Accelerate to get closer to the red van",
            "Give a long blast on the horn",
            "Flash your headlights several times"
        ]
    },
    {
        "You're driving in town. Ahead of you a bus is at a bus stop. Which of the following should you do?": [
            "Watch carefully for the sudden appearance of pedestrians",
            "Flash your lights to warn the driver of your presence",
            "Continue at the same speed but sound your horn as a warning",
            "Pass the bus as quickly as you possibly can"
        ]
    },
    {
        "You will find that driving smoothly can:": [
            "Reduce fuel consumption by about 15 percent",
            "Reduce journey times by about 15 percent",
            "Increase fuel consumption by about 15 percent",
            "Increase journey times by about 15 percent"
        ]
    },
    {
        "What should you do when parking your vehicle facing downhill?": [
            "Turn the steering wheel towards the kerb",
            "Park with two wheels on the kerb",
            "Park close to the bumper of another car",
            "Turn the steering wheel away from the kerb"
        ]
    },
    {
        "As you approach a pelican crossing the lights change to green. Elderly people are halfway across. You should:": [
            "Wait because they will take longer to cross",
            "Wave them to cross as quickly as they can",
            "Flash your lights in case they have not heard you",
            "Rev your engine to make them hurry"
        ]
    },
    {
        "You see a pedestrian with a white stick and red band. This means that the person is:": [
            "Deaf and blind",
            "Physically disabled",
            "Blind only",
            "Deaf only"
        ]
    },
    {
        "You are waiting at a T-junction. A vehicle is coming from the right with the left signal flashing. What should you do?": [ 
            "Wait until the vehicle starts to turn in",
            "Move out and accelerate hard",
            "Pull out before the vehicle reaches the junction",
            "Move out slowly"
        ]
    },
    {
        "You are driving on a motorway. You have to slow down quickly due to a hazard. You should:": [
            "Switch on your hazard lights",
            "Sound your horn",
            "Switch on your headlights",
            "Flash your headlights"
        ]
    },
    {
        "You are driving in a built-up area. You approach a speed hump. You should:": [
            "Slow your vehicle right down",
            "Move across to the left-hand side of the road",
            "Wait for any pedestrians to cross",
            "Stop and check both pavements"
        ]
    },
    {
        "You may drive over a footpath:": [
            "To get into a property",
            "To overtake slow-moving traffic",
            "If no pedestrians are near",
            "When the pavement is very wide"
        ]
    },
    {
        "You are driving on a clear night. There is a steady stream of oncoming traffic. The national speed limit applies. Which lights should you use?": [
            "Dipped headlights",
            "Full beam headlights",
            "Sidelights",
            "Fog lights"
        ]
    },
    {
        "When may you use hazard warning lights when driving?": [
            "On a motorway or unrestricted dual carriageway, to warn of a hazard ahead",
            "Instead of sounding the horn in a built-up area between 11.30 pm and 7 am",
            "On rural routes, after a warning sign of animals",
            "On the approach to toucan crossings where cyclists are waiting to cross"
        ]
    },
    {
        "Objects hanging from your interior mirror may:": [
            "Restrict your view",
            "Keep you focused",
            "Improve your driving",
            "Help your concentration"
        ]
    },
    {
        "You are driving towards a level crossing. What would be the first warning of an approaching train?": [
            "A steady amber light",
            "Both half barriers down",
            "One half barrier down",
            "Twin flashing red lights"
        ]
    },
    {
        "A single carriageway road has the national speed limit sign. What is the maximum permitted speed for a car towing a trailer?": [
            "50 miles per hour",
            "30 miles per hour",
            "40 miles per hour",
            "60 miles per hour"
        ]
    },
    {
        "Your vehicle has anti-lock brakes, but they may not always prevent skidding. This is most likely to happen when driving:": [
            "On loose road surfaces",
            "In foggy conditions",
            "At night on unlit roads",
            "On dry tarmac
        ]
    },
    {
        "You have been driving in thick fog which has now cleared. You must switch OFF your rear fog lights because:": [
            "They make your brake lights less clear",
            "They use a lot of power from the battery",
            "They will cause dazzle in your rear view mirrors",
            "They may not be properly adjusted"
        ]
    },
    {
        "At an incident someone is unconscious. What would your priority be?": [
            "Check their airway is clear",
            "Find out their name",
            "Make them comfortable",
            "Wake them up"
        ]
    },
    {
        "How old must you be to supervise a learner driver?": [
            "21 years old",
            "18 years old",
            "19 years old",
            "20 years old"
        ]
    },
    {
        "Why should you allow extra room when overtaking a motorcyclist on a windy day?": [
            "The rider may be blown across in front of you",
            "The rider may turn off suddenly to get out of the wind",
            "The rider may stop suddenly",
            "The rider may be travelling faster than normal"
        ]
    },
    {
        
        "You are driving along a single-carriageway when up ahead a lorry is turning onto the road and encroaching onto your lane. What should you be prepared to do?": [
            "Slow down and give way",
            "Sound your horn and continue",
            "Report the driver to the police",
            "Squeeze through the gap"
        ]
    },
    {
        "You are about to go down a steep hill. To control the speed of your vehicle you should:": [
            "Select a low gear and use the brakes carefully",
            "Select a high gear and use the brakes carefully",
            "Select a high gear and use the brakes firmly",
            "Select a low gear and avoid using the brakes"
        ]
    },
    {
        
        "You are waiting to emerge at a junction. Your view is restricted by parked vehicles. What can help you to see traffic on the road you are joining?": [
            "Reflections of traffic in shop windows",
            "Looking for traffic behind you",
            "Making eye contact with other road users",
            "Checking for traffic in your interior mirror"
        ]
    },
    {
        "You are at the front of a queue of traffic waiting to turn right into a side road. Why is it important to check your right mirror just before turning?": [
            "To check for overtaking vehicles",
            "To look for pedestrians about to cross",
            "To make sure the side road is clear",
            "To check for emerging traffic"
        ]
    },
    {
        "Which of these should you allow extra room when overtaking?": [
            "Bicycle",
            "Lorry",
            "Tractor",
            "Road-sweeping vehicle"
        ]
    },
    {
        "When leaving your vehicle parked and unattended you should:": [
            "Remove the key and lock it",
            "Park near a busy junction",
            "Park in a housing estate",
            "Leave the left indicator on"
        ]
    },
    {
        "You are carrying two 13 year old children and their parents in your car. Who is responsible for seeing that the children wear seat belts?": [
            "You, the driver",
            "The children's parents",
            "The front-seat passenger",
            "The children""
        ]
    },
    {
        "What is the national speed limit for cars and motorcycles in the centre lane of a three-lane motorway?": [
            "70 miles per hour",
            "40 miles per hour",
            "50 miles per hour",
            "60 miles per hour"
        ]
    },
    {
        "At toucan crossings:": [
            "Pedestrians and cyclists may cross",
            "You only stop if someone is waiting to cross",
            "Cyclists are not permitted",
            "There is a continuously flashing amber beacon"
        ]
    },
    {
        "You are turning left at a junction. Pedestrians have started to cross the road you will turn on to. You should:": [
            "Give way to them",
            "Go on, giving them plenty of room",
            "Stop and wave at them to cross",
            "Blow your horn and proceed"
        ]
    },
    {
        "You are taking drugs that are likely to affect your driving. What should you do?": [
            "Seek medical advice before driving",
            "Limit your driving to essential journeys",
            "Only drive if accompanied by a full licence-holder",
            "Drive only for short distances"
        ]
    },
    {
        "A bus lane on your left shows no times of operation. This means it is:" [
            "In operation 24 hours a day",
            "Not in operation at all",
            "Only in operation at peak times",
            "Only in operation in daylight hours"
        ]
    },
    {
        "Your vehicle needs a current MOT certificate. Until you have one you will NOT be able to:": [
            "Renew your vehicle excise licence",
            "Renew your driving licence",
            "Change your insurance company",
            "Notify a change of address"
        ]
    },
    {
        "You are driving on a motorway. By mistake, you go past the exit that you wanted to take. You should:": [
            "Carry on to the next exit",
            "Carefully reverse on the hard shoulder",
            "Carefully reverse in the left-hand lane",
            "Make a U-turn at the next gap in the central reservation"
        ]
    },
    {
        "You have been involved in an argument before starting your journey. This has made you feel angry. You should:": [
            "Calm down before you start to drive",
            "Start to drive, but open a window",
            "Drive slower than normal and turn your radio on",
            "Have an alcoholic drink to help you relax before driving"
        ]
    },
    {
        "A roof rack fitted to your car will:": [
            "Increase fuel consumption",
            "Reduce fuel consumption",
            "Improve the road handling",
            "Make your car go faster"
        ]
    },
    {
        "You arrive at an incident where someone is suffering from severe burns. You should:": [
            "Douse the burns with clean cool non-toxic liquid",
            "Apply lotions to the injury",
            "Burst any blisters",
            "Remove anything stuck to the burns"
        ]
    },
    {
        "Immediately after joining a motorway you should normally:": [
            "Keep in the left-hand lane",
            "Try to overtake",
            "Re-adjust your mirrors",
            "Position your vehicle in the centre lane"
        ]
    },
    {
        "There is a police car following you. The police officer flashes the headlights and points to the left. What should you do?": [
            "Pull up on the left",
            "Turn left at the next junction",
            "Stop immediately",
            "Move over to the left"
        ]
    },
    {
        "You are on a fast, open road in good conditions. For safety, the distance between you and the vehicle in front should be:": [
            "A two-second time gap",
            "One car length",
            "2 metres (6 feet 6 inches)",
            "Two car lengths"
        ]
    },
    {
        "Anti-lock brakes prevent wheels from locking. This means the tyres are less likely to:": [
            "Skid",
            "Aquaplane",
            "Puncture",
            "Wear"
        ]
    },
    {
        "Some two-way roads are divided into three lanes. Why are these particularly dangerous?": [
            "Traffic in both directions can use the middle lane to overtake",
            "Traffic can travel faster in poor weather conditions",
            "Traffic can overtake on the left",
            "Traffic uses the middle lane for emergencies only"
        ]
    },
    {
        "Where is the safest place to park your vehicle at night?": [
            "In a garage",
            "On a busy road",
            "In a quiet car park",
            "Near a red route"
        ]
    },
    {
        "Hazard warning lights should be used when vehicles are:": [
            "Broken down and causing an obstruction",
            "Faulty and moving slowly",
            "Being towed along a road",
            "Reversing into a side road"
        ]
    },
    {
        "You have broken down on a two-way road. You have a warning triangle. You should place the warning triangle at least how far from your vehicle?": [
            "45 metres (147 feet)",
            "5 metres (16 feet)",
            "25 metres (82 feet)",
            "100 metres (328 feet)"
        ]
    },
    {
        "When may you sound the horn?": [
            "To warn others of your presence", 
            "To give you right of way",
            "To attract a friend's attention",
            "To make slower drivers move over"
        ]
    },
    {
        "At a railway level crossing the red light signal continues to flash after a train has gone by. What should you do?": [
            "Wait",
            "Phone the signal operator",
            "Alert drivers behind you",
            "Proceed with caution"
        ]
    },
    {
        "You have to treat someone for shock at the scene of an incident. You should:": [
            "Reassure them constantly",
            "Walk them around to calm them down",
            "Give them something cold to drink",
            "Cool them down as soon as possible"
        ]
    },
    {
        "You are driving on the motorway in windy conditions. When passing high-sided vehicles you should:": [
            "Be wary of a sudden gust",
            "Increase your speed",
            "Drive alongside very closely",
            "Expect normal conditions"
        ]
    },
    {
        "You're driving along a country road. A horse and rider are approaching. What should you do?": [
            "Drive slowly past",
            "Increase your speed",
            "Sound your horn",
            "Flash your headlights"
        ]
    },
    {
        "You are driving along a country road. You see a triangle sign with a red border that says Ford. After dealing safely with the hazard you should always:": [
            "Test your brakes",
            "Check your tyre pressures",
            "Switch on your hazard warning lights",
            "Accelerate briskly"
        ]
    },
    {
        "You feel drowsy when driving. You should:": [
            "Stop and rest as soon as possible",
            "Turn the heater up to keep you warm and comfortable",
            "Close the car windows to help you concentrate",
            "Continue with your journey but drive more slowly"
        ]
    },
    {
        "As a provisional licence holder you should not drive a car:": [
            "On the motorway",
            "Over 30 miles per hour",
            "At night",
            "With passengers in rear seats"
        ]
    },
    {
        "When MUST you stop your vehicle?": [
            "If you're involved in an incident that causes damage or injury",
            "At a junction where there are 'give way' lines",
            "At the end of a one-way street",
            "Before merging onto a motorway"
        ]
    },
    {
        "How will your vehicle be affected when you drive up steep hills?": [
            "The engine will work harder",
            "The higher gears will pull better",
            "The steering will feel heavier",
            "Overtaking will be easier"
        ]
    },
    {
        "You are driving along a narrow residential road with many cars in driveways. A driver is on the left reversing from a driveway very close to you. You should:": [
            "Sound your horn and be prepared to stop",
            "Move to the opposite side of the road",
            "Drive through as you have priority",
            "Speed up and drive through quickly"
        ]
    },
    {
        "The road outside a school is marked with yellow zigzag lines. What do these lines mean?": [
            "You must not wait or park your vehicle here at all",
            "You may park on the lines when dropping off school children",
            "You may park on the lines when picking schoolchildren up",
            "You must stay with your vehicle if you park here"
        ]
    },
    {
        "You're driving in heavy traffic on a wet road. Spray makes it difficult to be seen. You should use your:": [
            "Dipped headlights",
            "Full-beam headlights",
            "Sidelights only",
            "Rear fog lights if visibility is more than 100 metres (328 feet)"
        ]
    },
    {
        "You want to turn right from a main road into a side road. Just before turning you should:": [
            "Check for traffic overtaking on your right",
            "Cancel your right-turn signal",
            "Select first gear",
            "Stop and set the handbrake"
        ]
    },
    {
        "What is the safest way to use a mobile phone in your vehicle?": [
            "Find a suitable place to stop",
            "Use hands-free equipment",
            "Drive slowly on a quiet road",
            "Direct your call through the operator"
        ]
    },
    {
        "Why would you fit a stabiliser before towing a caravan?": [
            "It will help with stability when driving in crosswinds",
            "It will allow heavy items to be loaded behind the axle",
            "It will help you to raise and lower the jockey wheel",
            "It will allow you to tow without the breakaway cable"
        ]
    },
    {
        "What can cause heavy steering?": [
            "Under-inflated tyres",
            "Driving on ice",
            "Badly worn brakes",
            "Over-inflated tyres"
        ]
    },
    {
        "You want to turn right at a box junction. There is oncoming traffic. You should:": [
            "Wait in the box junction if your exit is clear",
            "Wait before the junction until it is clear of all traffic",
            "Drive on, you cannot turn right at a box junction",
            "Drive slowly into the box junction when signalled by oncoming traffic"
        ]
    },
    {
        "What will improve fuel consumption?": [
            "Reducing your speed",
            "Rapid acceleration",
            "Late and harsh braking",
            "Driving in lower gears"
        ]
    },
    {
        "You are driving in traffic at the speed limit for the road. The driver behind is trying to overtake. You should:": [
            "Keep a steady course and allow the driver behind to overtake",
            "Move closer to the car ahead, so the driver behind has no room to overtake",
            "Wave the driver behind to overtake when it is safe",
            "Accelerate to get away from the driver behind"
        ]
    },
    {
        "A person herding sheep asks you to stop. You should:": [
            "Stop and switch off your engine",
            "Ignore them as they have no authority",
            "Continue on but drive slowly",
            "Try and get past quickly"
        ]
    },
    {
        "You are driving on a motorway and want to use your mobile phone. What should you do?": [
            "Leave the motorway and stop in a safe place",
            "Try to find a safe place on the hard shoulder",
            "Use the next exit and pull up on the slip road",
            "Move to the left lane and reduce your speed"
        ]
    },
    {
        "An injured motorcyclist is lying unconscious in the road. You should always:": [
            "Seek medical assistance",
            "Remove the safety helmet",
            "Move the person off the road",
            "Remove the leather jacket"
        ]
    },
    {
        "You are driving in heavy rain. Your steering suddenly becomes very light. You should:": [
            "Ease off the accelerator",
            "Steer towards the side of the road",
            "Apply gentle acceleration",
            "Brake firmly to reduce speed"
        ]
    },
    {
        "When may you reverse from a side road into a main road?": [
            "Not at any time",
            "Only if both roads are clear of traffic",
            "At any time",
            "Only if the main road is clear of traffic"
        ]
    },
    {
        
        "You are towing a trailer on a motorway. What is your maximum speed limit?": [
            "60 miles per hour",
            "40 miles per hour",
            "50 miles per hour",
            "70 miles per hour"
        ]
    }
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 4;
var GAME_LENGTH = 5;
var CARD_TITLE = "Trivia"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "I will ask you " + GAME_LENGTH.toString()
            + " questions, try to get as many right as you can. Just say the number of the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
        repromptText = "Question 1. " + spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.
    
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

