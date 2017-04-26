/*
  Copyright (c) 2017 forsenonlhaimaisentito
  
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  
  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const x11 = require('x11');

x11.createClient(function (err, display){
	if (err){
		console.error("Connection error");
		process.exit(-1);
	}
	
	var X = display.client;
	var root = display.screen[0].root;

	X.require('randr', function (err, Randr){
		if (err){
			console.error("RandR extension not available");
			process.exit(1);
		}
		
		Randr.QueryVersion(1, 2, function (){});
		
		Randr.SelectInput(root, Randr.NotifyMask.ScreenChange);

		X.on('event', function (ev){
			Randr.GetScreenInfo(root, function (err, info){
				if (err){
					console.error("Can't get screen information");
					process.exit(2);
				}
				
				Randr.SetScreenConfig(
					root, info.timestamp, info.config_timestamp,
					0, info.rotations, info.rates[1],
					function (err, res){
						if (err){
							console.error("Can't change screen configuration");
							process.exit(3);
						}
						
						console.log("Screen configuration changed");
					});
			});
		});
	});

	X.on('error', function (err){
		console.error("X11 protocol error", err);
		process.exit(-1);
	});
});
