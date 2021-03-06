
/// <reference path="/../../d2bsAPI.js" />
if(!isIncluded("njip.dbl")) include("njip.dbl");

var _NTT_BeltColNeeded = new Array(4);
_NTT_BeltColNeeded[0] = 0;
_NTT_BeltColNeeded[1] = 0;
_NTT_BeltColNeeded[2] = 0;
_NTT_BeltColNeeded[3] = 0;

var _NTT_BeltSize = false;

var _NTT_OldItems;

var _NTT_IgnoredItems = 
	new Array(	"aqv", 							// Arrows quiver
				"cqv", 							// Bolts quiver
				"key", 							// Keys
				"tbk", 							// Tome of Town Portal
				"ibk", 							// Tome of Identify
				"tsc", 							// Scroll of Town Portal
				"isc", 							// Scroll of Identify
				"yps", 							// Antidote potion
				"vps", 							// Stamina potion
				"wms", 							// Thawing potion
				"gps", 							// Rancid Gas Pot
				"ops", 							// Oil Potion
				"gpm", 							// Choking Gas Pot
				"opm", 							// Exploding Pot
				"gpl", 							// Strangling Gas
				"opl", 							// Fulminating Pot
				"hp1","hp2","hp3","hp4","hp5", 	// Healing potions
				"mp1","mp2","mp3","mp4","mp5", 	// Mana potions
				"rvs","rvl"						// Rejuvenation potions
			);


// type : 1 = shop, 2 = ressurect, 3 = repair, 4 = potion, 5 = scrolls, 6 = gamble, 7 = ammo, 8 = healing
function NTT_CheckNPC(npc, type)
{
	var _npcclassid;

	if(typeof(npc) == "number")
		_npcclassid = npc;
	else
		_npcclassid = npc.classid;

	if(type == 1)
	{
		if(_npcclassid == 147 || _npcclassid == 148 || _npcclassid == 154 || _npcclassid == 177 ||
			_npcclassid == 178 || _npcclassid == 199 || _npcclassid == 202 || _npcclassid == 252 ||
			_npcclassid == 253 || _npcclassid == 254 || _npcclassid == 255 || _npcclassid == 257 ||
			_npcclassid == 405 || _npcclassid == 511 || _npcclassid == 512 || _npcclassid == 513)
			return true;
		else
			return false;
	}

	if(type == 2)
	{
		if(_npcclassid == 150 || _npcclassid == 198 || _npcclassid == 252 || _npcclassid == 367 || _npcclassid == 515)
			return true;
		else
			return false;
	}

	if(type == 3)
	{
		if(_npcclassid == 154 || _npcclassid == 178 || _npcclassid == 253 || _npcclassid == 257 || _npcclassid == 511)
			return true;
		else
			return false;
	}

	if(type == 4)
	{
		if(_npcclassid == 148 || _npcclassid == 177 || _npcclassid == 198 || _npcclassid == 202 ||
			_npcclassid == 255 || _npcclassid == 405 || _npcclassid == 513)
			return true;
		else
			return false;
	}

	if(type == 5)
	{
		if(_npcclassid == 148 || _npcclassid == 177 || _npcclassid == 255 || _npcclassid == 405 || _npcclassid == 513)
			return true;
		else
			return false;
	}

	if(type == 6)
	{
		if(_npcclassid == 147 || _npcclassid == 199 || _npcclassid == 254 ||
			_npcclassid == 405 || _npcclassid == 512 || _npcclassid == 514)
			return true;
		else
			return false;
	}

	if(type == 7)
	{
		if(_npcclassid == 147 || _npcclassid == 154 || _npcclassid == 178 || _npcclassid == 199 || _npcclassid == 252 ||
			_npcclassid == 253 || _npcclassid == 257 || _npcclassid == 511 || _npcclassid == 512)
			return true;
		else
			return false;
	}

	if(type == 8)
	{
		if(_npcclassid == 148 || _npcclassid == 178 || _npcclassid == 255 || _npcclassid == 513)
			return true;
		else
			return false;
	}

	return false;
}


// npc : NPC, stash or cube
function NTT_DoInteract(npc)
{
	debugPrint("ntt do Interact npc:"+npc.name);
	var _uiflag = 0x08;

	if(!npc)
		return false;

	if(npc.classid == 267)
		_uiflag = 0x19;
	else if(npc.classid == 549)
		_uiflag = 0x1A;

	if(getUIFlag(_uiflag))
		return true;

	for(var i = 0 ; i < 36 ; i++)
	{
		if((i % 2) == 0)
		{
			if(getUIFlag(0x17))
			{ 
				me.cancel(1);
				NTC_Delay(250); 
			}

			if(npc.classid == 549)
				clickItem(1, npc);
			else
				npc.interact();
		}
		if((i % 4) == 0){		
				me.cancel(1);
		}

		NTC_Delay(250);

		if(getUIFlag(_uiflag))
		{
			NTC_PingDelay(500);
			return true;
		}
	}

	return false;
}


// type	: 0 = shop, 1 = gamble
function NTT_DoTrade(npc, type)
{
	debugPrint("ntt_DoTrade npc:"+npc.name);
	
	if(!npc)
		return false;

	if(getUIFlag(0x0C))
		return true;

	if(arguments.length < 2)
		type = 0;

	for(var i = 0 ; i < 12 ; i++)
	{
		if((i % 4) == 0)
		{
			if(NTT_CheckNPC(npc.classid, 3))
				npc.useMenu(0x0D06);
			else if(type == 1 && NTT_CheckNPC(npc.classid, 6))
				npc.useMenu(0x0D46);
			else
				npc.useMenu(0x0D44);
		}

		NTC_Delay(250);

		if(getUIFlag(0x0C))
		{
			NTC_PingDelay(1000);
			
			if (npc.getItems()) {
				if (NTSB_ShopOnNpcVisit && !type) {
					NTSB_QuickShop(npc);
				}
				
				return true;
			}
			
			print("�c2NTT �c8:: �c1No items found. Retrying...")
			NTT_MenuCancel();
			
			if (NTT_DoInteract(npc)) {
				if(NTT_CheckNPC(npc.classid, 3))
					npc.useMenu(0x0D06);
				else if(type == 1 && NTT_CheckNPC(npc.classid, 6))
					npc.useMenu(0x0D46);
				else
					npc.useMenu(0x0D44);
			}
		}
	}
	
	NTT_MenuCancel();

	return false;
}


function NTT_MenuCancel()
{
	var i;
	
	for(i = 0 ; i < 4 ; i++)
	{
		if(getUIFlag(0x0C) || getUIFlag(0x0D) || getUIFlag(0x14) || getUIFlag(0x19) || getUIFlag(0x1A) || getUIFlag(0x01))
		{
			me.cancel(0);
			NTC_Delay(500);
		}
		else
			break;
	}

	for(i = 0 ; i < 4 ; i++)
	{
		if(getUIFlag(0x08) || getUIFlag(0x17))
		{
			me.cancel(1);
			NTC_Delay(250);
			
		}
		else
			break;
	}
}


function NTT_GetCorpses()
{
    var _corpse, i;
	
	for(i = 0 ; i < 2 ; i++)
	{
		_corpse = NTC_GetUnit(NTC_UNIT_PLAYER);

		do
		{
			if(_corpse.name == me.name && _corpse.hpmax == 0)
			{
				NTC_DoWeaponSwitch(0);

				_corpse.interact();

				NTC_PingDelay(1000);

				break;
			}
		} while(_corpse.getNext());
	}
	
	for(i = 0 ; i < 2 ; i++)
	{
		_corpse = NTC_GetUnit(NTC_UNIT_PLAYER);
		do
		{
			if(_corpse.name == me.name && _corpse.hpmax == 0)
			{
				// st buged corpse telling oog to stop
				sendCopyData(null, "OOG", 0,"Stop Me");
				ShowConsole = 0;
				print("failed to pick corpse, stopping")
			}
		} while(_corpse.getNext());
	}
}


function NTT_CheckMerc()
{
	if(NTConfig_UseMerc)
	{
		if(NTC_GetMerc())
			return false;
		else
		{
			if(NTC_MyGold() < me.mercrevivecost)
				return false;

			return true;
		}
	}

	return false;
} 


function NTT_ReviveMerc(npc)
{
	var _mygold;

	if(!NTT_CheckMerc())
		return true;

	if(!npc)
		return false;

	if(!getUIFlag(0x08))
		return false;

	_mygold = NTC_MyGold();

	if(_mygold < me.mercrevivecost)
		return false;

	for(var i = 0 ; i < 6 ; i++)
	{
		if((i % 2) == 0)
			npc.useMenu(0x1507);

		NTC_Delay(500);

		if(_mygold > NTC_MyGold())
			return true;
	}

	return false;
}


function NTT_ResetWeaponMerc()
{
//	var i, n;
//	var _merc, _items;
//	var _result = 0;

//	_merc = NTC_GetMerc();

//	if(!_merc)
//		return false;

//	_items = NTC_GetItems(_merc);

//	for(i = 0 ; i < _items.length ; i++)
//	{
//		if(_items[i].bodylocation == 4)// && _items[i].getFlag(0x4000000))
//		{
//			_result = _items[i].gid;
//			for(n = 0 ; n < 60 ; n++)
//			{
//				if((n % 20) == 0)
//			
//					clickItem(4, 4);

//				NTC_Delay(100);

//				if(me.itemoncursor)
//				{
//					NTC_PingDelay(1000);
//					break;
//				}
//			}

//			if(n >= 60)
//				break;

//			for(n = 0 ; n < 100 ; n++)
//			{
//				if((n % 20) == 0)
//					clickItem(4, 4);

//				NTC_Delay(100);

//				if(!me.itemoncursor)
//				{
//					NTC_PingDelay(500);

//					break;;
//				}
//			}

//			break;
//		}
//	}
//	if (_result ==0)
//		return true;
//	
//	delay(1500);
//	_items = NTC_GetItems(_merc);
//	for(i = 0 ; i < _items.length ; i++)
//	{
//		if(_items[i].bodylocation == 1 )
//		{
//			return true;
//		}
//	}
//	if(me.itemoncursor){
//		while(me.itemoncursor){
//				clickItem(4, 4);
//				NTC_Delay(1000);
//		}
//	}else {
//	var droped = NTSI_findItemGID(_result);
//	if (droped){
//		NTSI_PickUpItemInt(droped);
//		print("crap i droped merc's wepon pausing");
//		NT_Pause=true;
//		sendCopyData(null, "OOG", 0,"Stop Me");
//		NTC_Delay(100);
//	}
//	}
//	NTSI_PickItems();
//	
//	
//	return false;
}


function NTT_CheckRepair(repairpercent)
{
	var max_durability;
	var percent;
	var items = NTC_GetItems();

	if(!items)
		return false;

	for(var i = 0 ; i < items.length ; i++)
	{
		if(items[i].mode == 1 && !items[i].getFlag(0x400000) && !items[i].getStat(152) && !getBaseStat(0, items[i].classid, 59))
		{
			max_durability = items[i].getStat(73);
			if(max_durability == 0)
				continue;

			percent = Math.floor((items[i].getStat(72)*100) / (max_durability*(items[i].getStat(75)/100 + 1)));

			if(percent <= repairpercent)
				return true;
		}
	}

	return false;
}


function NTT_RepairItems(npc)
{
	var _mygold;

	if(!npc)
		return false;

	if(!getUIFlag(0x08) || !getUIFlag(0x0C))
		return false;

	_mygold = NTC_MyGold();

	for(var i = 0 ; i < 6 ; i++)
	{
		if((i % 2) == 0)
			me.repair();

		NTC_Delay(500);

		if(_mygold > NTC_MyGold())
			return true;
	}

	return false;
}


function NTT_CheckInventory(returnInventoryArray)
{
	var x, y;
	var _items;

	var _itemlist = new Array();
	var _ignorestring = _NTT_IgnoredItems.join();

	if(!NTC_StashGoldFull() && NTC_MyGoldCarry() > NTConfig_MinGoldToStash )
		return true;

	var _invspace = new Array(4);
	_invspace[0] = new Array(10);
	_invspace[1] = new Array(10);
	_invspace[2] = new Array(10);
	_invspace[3] = new Array(10);

	for(y = 0 ; y < 4 ; y++)
	{
		for(x = 0 ; x < 10 ; x++)
			_invspace[y][x] = 0;
	}

	_items = NTC_GetItems();

	if(!_items)
		return false;

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY)
		{
			if(NTConfig_Columns[_items[i].y][_items[i].x] > 0)
				_itemlist.push(_items[i].code);

			for(y = 0 ; y < _items[i].sizey ; y++)
			{
				for(x = 0 ; x < _items[i].sizex ; x++)
					_invspace[y+_items[i].y][x+_items[i].x] = 1;
			}
		}
	}
	if (returnInventoryArray) return _invspace
	var _freecols = new Array(10);

	for( x = 0 ; x < 10 ; x++)
		_freecols[x] = 0; 

	for(x = 0 ; x < 10 ; x++)
	{
		for( y = 0 ; y < 4 ; y++)
		{
			if(_invspace[y][x] == 1)
			{
				_freecols[x] = 1;
				break;
			}
		}
	}

	var _numfreecols = 0;

	for( x = 0 ; x < 10 ; x++)
	{ 
		if(_freecols[x] == 0)
			_numfreecols++;
	}

	if(NTConfig_FreeSpace > _numfreecols)
	{
		for( x = 0 ; x < _itemlist.length ; x++)
		{
			if(_ignorestring.indexOf(_itemlist[x]) != -1)
				_itemlist.splice(x, 1);
		}

		if(_itemlist.length > 0)
			return true;
	}

	return false;
}


function NTT_CheckStash()
{
	var x, y;
	var _items;
	var _StashHeight = (me.gametype == 0) ? 4 : 8;
	var _stashspace = new Array(_StashHeight);

	for(y = 0 ; y < _StashHeight ; y++)
		_stashspace[y] = new Array(6); 

	for(y = 0 ; y < _StashHeight ; y++)
	{
		for(x = 0 ; x < 6 ; x++)
			_stashspace[y][x] = 0;
	}

	_items = NTC_GetItems();

	if(!_items)
		return false;

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_STASH)
		{
			for(y = 0 ; y < _items[i].sizey ; y++)
			{
				for(x = 0 ; x < _items[i].sizex ; x++)
					_stashspace[y+_items[i].y][x+_items[i].x] = 1;
			}
		}
	}

	for(y = 0 ; y < _StashHeight ; y++)
	{
		for(x = 0 ; x < 6 ; x++)
		{
			if(_stashspace[y][x] != 1)
				return true;
		}
	}

	return false;
}


function NTT_ManageStash(invitem)
{
	var i, x, y;
	var _items;
	var _stashall;
	var StashHeight = (me.gametype == 0) ? 4 : 8;
	var _ignorestring = _NTT_IgnoredItems.join();
	var _ignoreitem;

	if(!getUIFlag(0x19))
		return false;

	if(arguments.length < 1)
		_stashall = true;
	else
		_stashall = false;

	if(!NTC_StashGoldFull() && NTC_MyGoldCarry() > NTConfig_MinGoldToStash)
	{
		var _mygold = NTC_MyGoldCarry();

		gold(_mygold, 3);

		for(i = 0 ; i < 2 ; i++)
		{
			NTC_Delay(500);

			if(_mygold > NTC_MyGoldCarry())
				break;
		}
	}

	var _stashspace = new Array(StashHeight);

	for(y = 0 ; y < StashHeight ; y++)
		_stashspace[y] = new Array(6);

	for(y = 0 ; y < StashHeight ; y++)
	{
		for(x = 0 ; x < 6 ; x++)
			_stashspace[y][x] = 0;
	}

	_items = NTC_GetItems();

	if(!_items)
		return false;

	for(i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_STASH)
		{
			for(y = 0 ; y < _items[i].sizey ; y++)
			{
				for(x = 0 ; x < _items[i].sizex ; x++)
					_stashspace[y+_items[i].y][x+_items[i].x] = 1;
			}
		}
	}

	for( i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY && (_stashall || (_items[i].x == invitem.x && _items[i].y == invitem.y)))
		{
			if(_stashall)
			{
				_ignoreitem = (NTConfig_Columns[_items[i].y][_items[i].x] == 0);

				if(!_ignoreitem)
				{
                			if( _ignorestring.indexOf(_items[i].code) != -1 || (!_items[i].getFlag(0x10) && njipCheckGoodItem(_items[i], NJIP_CHECK_SIMPLE) <= 0 ))
						_ignoreitem = true;
            			}
			} 
			else
				_ignoreitem = false;

			if(!_ignoreitem)
			{
				var _itemdone = false;

				for(y = 0 ; y < StashHeight ; y++)
				{
					if(_itemdone)
						break;

					for(x = 0 ; x < 6 ; x++)
					{
						if(_itemdone)
							break;

						if(_stashspace[y][x] == 0)
						{
							if((x+_items[i].sizex-1) < 6 && (y+_items[i].sizey-1) < StashHeight)
							{
								var _havespace = true;

								for(var m = 0 ; m < _items[i].sizey ; m++)
								{
									for(var n = 0 ; n < _items[i].sizex ; n++)
									{
										if(_stashspace[y+m][x+n] == 1)
										{
											_havespace = false;
											m = 4;
											break;
										}
									}
								}

								if(_havespace)
								{
									if(NTC_ItemToCursor(_items[i]))
									{
										NTC_PingDelay(500);

										for(n = 0 ; n < 50 ; n++)
										{
											if((n % 10) == 0)
												clickItem(0, x, y, ITEMLOC_STASH);

											NTC_Delay(100);

											if(!me.itemoncursor)
												break;
										}

										if(n < 50)
										{
											for(m = 0 ; m < _items[i].sizey ; m++)
											{
												for(n = 0 ; n < _items[i].sizex ; n++)
													_stashspace[y+m][x+n] = 1;
											}
										}

										NTC_PingDelay(500);
									}

									_itemdone = true;
								}
							}
						}
					}
				}
			}

			if(!_stashall)
				return true;
		}
	}

	return true;
}


// type	: id = 0, tp = 1
function NTT_GetScroll(type)
{
	var _items;
	var _scrollcode;

	if(arguments.length < 1)
		type = 0;

	_items = NTC_GetItems();

	if(!_items)
		return false;

	if(type)
		_scrollcode = "tsc";
	else
		_scrollcode = "isc";

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY && _items[i].code == _scrollcode)
			return _items[i];
	}

	return false;
}


// type	: id = 0, tp = 1
function NTT_GetTome(type)
{
	var _items;
	var _tomecode;

	if(arguments.length < 1)
		type = 0;

	_items = NTC_GetItems();

	if(!_items)
		return false;

	if(type)
		_tomecode = "tbk";
	else
		_tomecode = "ibk";

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY && _items[i].code == _tomecode)
			return _items[i];
	}

	return false;
}


// type	: id = 0, tp = 1
function NTT_FillTome(npc, type)
{
	var _tome;

	if(arguments.length < 1)
		return false;

	if(arguments.length < 2)
		type = 0;

	_tome = NTT_GetTome(type);

	if(_tome)
	{
		var _items;
		var _scrollcode;

		if(_tome.getStat(70) >= 20)
			return true;
//_items = who.getItems();
		_items = NTC_GetItems(npc);

		if(!_items)
			return false;

		if(type)
			_scrollcode = "tsc";
		else
			_scrollcode = "isc";

		for(var i = 0 ; i < _items.length ; i++)
		{
			if(_items[i].code == _scrollcode)
				return NTT_ShopItem(_items[i], npc, 3);
		}
	}

	return false;
}


// type	: id = 0, tp = 1
function NTT_BuyScrolls(npc, type, amount)
{
	var _items;
	var _scrollcode;
	var _counter = 0;

	if(arguments.length < 1)
		return false;

	if(arguments.length < 2)
		type = 0;

	if(arguments.length < 3)
		amount = 1;

	if(amount == 0)
		return false;

	_items = NTC_GetItems(npc);

	if(!_items)
		return false;

	if(type)
		_scrollcode = "tsc";
	else
		_scrollcode = "isc";

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].code == _scrollcode)
		{
			for(var n = 0 ; n < amount ; n++)
			{
				if(NTT_ShopItem(_items[i], npc, 2))
					_counter++;
			}

			break;
		}
	}

	return (_counter > 0);
}


function NTT_GetKey()
{
	var _items;

	_items = NTC_GetItems();

	if(!_items)
		return false;

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY && _items[i].code == "key")
			return _items[i];
	}

	return false;
}


function NTT_FillKey(npc)
{
	var _key;
	var _items;

	if(arguments.length < 1)
		return false;
        
	_key = NTT_GetKey();

	if(_key)
	{
		if(_key.getStat(70) >= 12)
			return true;

		_items = NTC_GetItems(npc);

		if(!_items)
			return false;

		for(var i = 0 ; i < _items.length ; i++)
		{
			if(_items[i].code == "key")
				return NTT_ShopItem(_items[i], npc, 3);
		}
	}
	else
	{
		_items = NTC_GetItems(npc);

		if(!_items)
			return false;

		for(var j = 0 ; j < _items.length ; j++)
		{
			if(_items[j].code == "key")
			{
				NTT_ShopItem(_items[j], npc, 2);
				return NTT_ShopItem(_items[j], npc, 3);
			}
		}
	}

	return false;
}


function NTT_CheckBelt()
{
	var _needpotions = false;

	for(var i = 0 ; i < 4 ; i++)
	{
		_NTT_BeltColNeeded[i] = NTT_GetNeededPotionsColInt(NTConfig_BeltColType[i], i);

		if(4-_NTT_BeltColNeeded[i] < NTConfig_BeltColMin[i] && NTConfig_BeltColType[i] != "rv")
			_needpotions = true;
	}

	return _needpotions;
}


function NTT_FillBelt(npc)
{
	if(!npc)
		return false;

	if(!getUIFlag(0x08) || !getUIFlag(0x0C))
		return false;

	if(!_NTT_BeltSize)
		_NTT_BeltSize = NTC_GetBeltSize();

	if(_NTT_BeltColNeeded[3] == _NTT_BeltSize || _NTT_BeltColNeeded[2] == _NTT_BeltSize || _NTT_BeltColNeeded[1] == _NTT_BeltSize || _NTT_BeltColNeeded[0] == _NTT_BeltSize)
		NTT_BuyPotionsSlowInt(npc);
	else
		NTT_BuyPotionsFastInt(npc);

	return true;
}


function NTT_CheckHeal()
{
	var _mercHP;

	if(me.hp < parseInt((me.hpmax*NTConfig_SkipHealLife)/100) || me.mp < parseInt((me.mpmax*NTConfig_SkipHealMana)/100))
		return true;

	_mercHP = getMercHP();

	if(_mercHP > 0 && _mercHP < NTConfig_SkipHealLife)
		return true;

	return false;
}


function NTT_CheckSpace(itemX, itemY)
{
	var i, j, x, y;
	var _items;

	var _invspace = new Array(4);
	_invspace[0] = new Array(10);
	_invspace[1] = new Array(10);
	_invspace[2] = new Array(10);
	_invspace[3] = new Array(10);

	for(y = 0 ; y < 4 ; y++)
	{
		for(x = 0 ; x < 10 ; x++)
			_invspace[y][x] = 0;
	}

	_items = NTC_GetItems();

	if(!_items)
		return false;

	for(i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY)
		{
			for(y = 0 ; y < _items[i].sizey ; y++)
			{
				for(x = 0 ; x < _items[i].sizex ; x++)
					_invspace[y+_items[i].y][x+_items[i].x] = 1;
			}
		}
	}

	for(i = 0 ; i < 5-itemY ; i++)
	{
		invloop2:

		for(j = 0 ; j < 11-itemX ; j++)
		{
			for(y = 0 ; y < itemY ; y++)
			{
				for(x = 0 ; x < itemX ; x++)
				{
					if(_invspace[i+y][j+x])
						continue invloop2;
				}
			}

			return true;
		}
	}

	return false;
}


function NTT_CleanPotions()
{
	var _items = NTC_GetItems();

	if(!_items)
		return false;

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY && (_items[i].itemType == 76 || _items[i].itemType == 77 || _items[i].itemType == 78))
		{
			if(NTConfig_Columns[_items[i].y][_items[i].x] > 0)
			{
				_items[i].interact();

				NTC_Delay(500);
			}
		}
	}
	
	return true;
}


function NTT_ClearInventory()
{
	debugPrint("ntt clear inventory");
	
	var _retval = true;
	var _ignorestring = _NTT_IgnoredItems.join();
	var _items;

	_items = NTC_GetItems();

	if(!_items)
		return false;

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY)
		{
			if(NTConfig_Columns[_items[i].y][_items[i].x] > 0)
			{
				if(_ignorestring.indexOf(_items[i].code) != -1 || !_items[i].getFlag(0x10))
					continue;

				if(njipCheckGoodItem(_items[i], NJIP_CHECK_SIMPLE) == 0)
				{
					if(NTT_DropItem(_items[i]))
						NTC_PingDelay(250);
					else
						_retval = false;
				}
			}
		}
	}

	return _retval;
}


function NTT_DropItem(item)
{
	debugPrint("ntt dropItem");
	
	if(!item)
		return false;

	if(NTC_ItemToCursor(item)){
	  var _isEthereal = (item.getFlag(0x400000)) ? "1" : "0";
	  var text = "Drop item ";
		switch(item.quality)
		{
		case 4:
			print(text + "�c3" + item.name);
			break;
		case 5:
			print(text + "�c2" + item.name);
			break;
		case 6:
			print(text + "�c9" + item.name);
			break;
		case 7:
			print(text + "�c4" + item.name);
			break;
		case 8:
			print(text + "�c8" + item.name);
			break;
		default:
			print(text + "�c0" + item.name);
			break;
		}	   
	   
	   writeLog(item, me, _isEthereal, 2);
		 return NTC_ClearCursor();		
	}

	return false;
}


function NTT_ClearBelt()
{
	var i;
	var _result, _needdrop;
	var _items;

	do
	{
		_items = NTC_GetItems();

		if(!_items)
			return false;

		_result = true;

		for(i = 0 ; i < _items.length ; i++)
		{
			if(_items[i].mode == 2 && _items[i].x < 4)
			{
				_needdrop = false;

				switch(_items[i].itemType)
				{
					case 76:
						if( NTConfig_BeltColType[_items[i].x] != "hp" && NTConfig_BeltColMin[_items[i].x] != 0 )
							_needdrop = true;
						break;
						
					case 77:
						if( NTConfig_BeltColType[_items[i].x] != "mp" && NTConfig_BeltColMin[_items[i].x] != 0 )
							_needdrop = true;
						break;
						
					case 78:
						if( NTConfig_BeltColType[_items[i].x] != "rv" && NTConfig_BeltColMin[_items[i].x] != 0 )
							_needdrop = true;
						break;
						
					default:
						_needdrop = true;
						break;
				}

				if(_needdrop)
				{
					if(NTT_DropItem(_items[i]))
					{
						NTC_Delay(200);
					}

					_result = false;
				}
			}
		}
	} while(!_result);

	return _result;
}


// mode	: 1 = sell, 2 = buy, 3 = shift buy
function NTT_ShopItem(item, npc, mode)
{
	debugPrint("ntt ShopItem:"+item.name+" NPC:"+npc.name+" mode:"+mode);
	var _mygold = NTC_MyGold();

	if(mode > 1)
	{
		if(version() == "1.1.1"){
			if(item.getPrice(npc, 0) > _mygold)
				return false;
		}else{
			if(item.getItemCost(0) > _mygold)
				return false;
		}
	}
	if(mode > 1)
	{
		var _havespace = false;

		if(item.code == "isc" || item.code == "tsc")
		{
			var _book = (item.code == "isc") ? NTT_GetTome(0) : NTT_GetTome(1);

			if(_book && _book.getStat(70) < 20)
				_havespace = true;
        }

        if ("hp1 hp2 hp3 hp4 hp5 mp1 mp2 mp3 mp4 mp5".indexOf(item.code) > -1)
            _havespace = true;
   		if(!_havespace)
		{	
			if(NTT_CheckSpace(item.sizex, item.sizey))
				_havespace = true;
		}

		if(_havespace)
		{
			debugPrintBeltGID();
			
			for(var i = 0 ; i < 60 ; i++)
			{
				if(i == 0)
				{
					//sendCopyData(null, "OOG", 0,"ntt ShopItem:"+item.name+" NPC:"+npc.name+" mode:"+mode+"i: "+i+"loc: "+item.location);
					debugPrint("ntt ShopItem:"+item.name+" NPC:"+npc.name+" mode:"+mode+"item toSource: "+item.toSource());
					NTC_Delay(600);
					item.shop(mode > 2 ? 6 : 2);
					NTC_PingDelay(300);
					debugPrint("ntt ShopItem:returned");
				
				}
				
				debugPrintBeltGID();
				
				NTC_Delay(100);
				
				if(_mygold > NTC_MyGold())
				{
					debugPrint("ntt ShopItem:post Buying Delay");
					NTC_PingDelay(100);	
					
					return true;
				}
			}
		}
	}
	else
	{
		if(NTC_ItemToCursor(item))
		{
			for(var j = 0 ; j < 50 ; j++)
			{
				if((j % 10) == 0)
					item.shop(1);
				
				NTC_PingDelay(300);
				
				NTC_Delay(100);

				if(!me.itemoncursor)
				{
					NTC_PingDelay(750);
					return true;
				}
			}
		}
        }

	return false;
}


function NTT_IdItem(scroll, uniditem)
{
	var i, _timer;

	if(arguments.length < 1 || !scroll)
		return false;

	if(arguments.length < 2 || !uniditem)
		return false;

	if(uniditem.getFlag(0x10))
		return true;

	for(i = 0 ; i < 30 ; i++)
	{
		if((i % 10) == 0)
			clickItem(1, scroll);

		NTC_Delay(100);

		if(getCursorType() == 6)
			break;
	}

	if(getCursorType() != 6)
		return false;

	NTC_PingDelay(250);

	for(i = 0 ; i < 60 ; i++)
	{
		if((i % 20) == 0)
			clickItem(0, uniditem);

		NTC_Delay(100);

		if(uniditem.getFlag(0x10))
		{
			NTC_PingDelay(500);
			return true;
		}
	}

	return false;
}


function NTT_CheckUnids()
{
	var _unidcount = 0;
	var _items = NTC_GetItems();

	if(!_items)
		return _unidcount;

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY && !_items[i].getFlag(0x10))
			_unidcount++;
	}

	return _unidcount;
}


function NTT_GetUnidItems()
{
	var _uniditems = new Array();
	var _items = NTC_GetItems();

	if(!_items)
		return _uniditems;

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY && !_items[i].getFlag(0x10))
			_uniditems.push(copyUnit(_items[i]));
	}

	return _uniditems;
}


function NTT_GambleIt(npc)
{
	var _gambleitem, _newitem;

	if(!npc)
		return false;

	if(!getUIFlag(0x08) || !getUIFlag(0x0C))
		return false;

	_gambleitem = NTC_GetItems(npc);

	if(!_gambleitem)
		return false;

	for(var i = 0 ; i < _gambleitem.length ; i++)
	{
		if(NTC_MyGold() < NTConfig_GambleStopGold)
			return false;

		if(NTT_IsItemInGambleArrayInt(_gambleitem[i].code))
		{
			if(NTT_CheckSpace(_gambleitem[i].sizex, _gambleitem[i].sizey))
			{
				NTT_GetOldItemsInt();

				if(NTT_ShopItem(_gambleitem[i], npc, 2))
					_newitem = NTT_GetGambledItemInt();
				else
					return false;

				if(_newitem)
				{
					while(!_newitem.getFlag(0x10))
						NTC_Delay(100);

					NTC_PingDelay(250);
					var _isEthereal = (_newitem.getFlag(0x400000)) ? "1" : "0";
					
					if(njipCheckGoodItem(_newitem, NJIP_CHECK_SIMPLE) > 0)
					{
						writeLog(_newitem, me, _isEthereal, 0);
						NTC_SendLogToOOG("Kept [" + NTC_ItemQualityToNameList[_newitem.quality] + "] " + _newitem.name);
					}
					else
					{
						writeLog(_newitem, me, _isEthereal, 1);
						_newitem.shop(1);
						NTC_PingDelay(300);
					}
				}
			} 
		}
	}

	return true;
}


// Internal function
function NTT_IsItemInGambleArrayInt(itemcode)
{
	for(var i = 0 ; i < NTConfig_GambleItem.length ; i++)
	{
		if(itemcode == NTConfig_GambleItem[i])
			return true;
	}

	return false;
}


function NTT_GetPotionAtNPCInt(type, npc)
{
	var _items;

	if(!type)
		return false;

	if(type == "hp" || type == "mp")
	{
		_items = NTC_GetItems(npc);

		if(_items)
		{
			var n;

			for(var i = _items.length -1 ; i > 0   ; i--)
			{
				for(n = 5 ; n > 0 ; n--)
				{
					if(_items[i].code == (type+n))
						return _items[i];
				}
			}
		}
	} 
	else
	{
		if(type == "rv")
			return false;

		_items = NTC_GetItems(npc);

		if(_items)
		{
			for(var j = 0 ; j < _items.length ; j++)
			{
				if(_items[j].code == type)
					return _items[j];
			}
		}
	}

	return false;
}


function NTT_BuyPotionsFastInt(npc)
{
	var i, n;
	var _insert, _potion;
	var _typearray = new Array();

	for(i = 0 ; i < 4 ; i++)
	{
		if(_NTT_BeltColNeeded[i] > 0)
		{
			if(_typearray.length == 0)
				_typearray.push(NTConfig_BeltColType[i]);
			else
			{
				_insert = true;

				for(n = 0 ; n < _typearray.length ; n++)
				{
					if(_typearray[n] == NTConfig_BeltColType[i])
						_insert = false;
				}

				if(_insert)
					_typearray.push(NTConfig_BeltColType[i]);
			}
		}
	}

	for(i = 0 ; i < _typearray.length ; i++)
	{
		if(_typearray[i] == "rv")
			continue;

		_potion = NTT_GetPotionAtNPCInt(_typearray[i], npc);

		if(_potion)
		{ 
			if(NTT_ShopItem(_potion, npc, 3))
				continue;
			else
				return false;
		}
		else
			return false;
	}

	return true;
}


function NTT_BuyPotionsColInt(npc, col)
{
	var _numpotions;
	var _potion;

	if(col < 0 || col > 3)
		return false;

	if(NTConfig_BeltColType[col] == "rv")
		return false;

	_numpotions = _NTT_BeltColNeeded[col];

	if(_numpotions == 0)
		return false;

	if(_numpotions > _NTT_BeltSize)
		_numpotions = _NTT_BeltSize;

	for(var _buyloop = 0 ; _buyloop < _numpotions ; _buyloop++)
	{
		_potion = NTT_GetPotionAtNPCInt(NTConfig_BeltColType[col], npc);

		if(_potion)
			NTT_ShopItem(_potion, npc, 2);
		else
			return false;
	}
	
	return true;
}


function NTT_BuyPotionsSlowInt(npc)
{
	var _currentcol;

	for(_currentcol = 0 ; _currentcol < 4 ; _currentcol++)
	{
		if(_NTT_BeltColNeeded[_currentcol] == _NTT_BeltSize)
		{
			NTT_BuyPotionsColInt(npc, _currentcol);
			_NTT_BeltColNeeded[_currentcol] = 0;
		}
	}

	for(_currentcol = 0 ; _currentcol < 4 ; _currentcol++)
	{
		NTT_BuyPotionsColInt(npc, _currentcol);
	}
		
	return true;
}


function NTT_GetNeededPotionsColInt(type, column)
{
	var _restartloop = true;
	var _amountneeded = 0;
	var _items;

	if(!type || column > 3)
		return false;

	if(!_NTT_BeltSize)
		_NTT_BeltSize = NTC_GetBeltSize();

	potionloop:
	do
	{
		_amountneeded = _NTT_BeltSize;

		_items = NTC_GetItems();

		if(!_items)
			continue potionloop;

		for(var i = 0 ; i < _items.length ; i++)
		{
			if(_items[i].mode == 2)
			{
				if(NTT_PotInRightColInt(_items[i].x, column, _NTT_BeltSize))
				{
					var _potcode = _items[i].code;

					if(_potcode.indexOf(type) != -1)
						_amountneeded--;
					else
					{
						if(_potcode.indexOf("rv") != -1)
						{
							if(_items[i].x < 4)
								return 0;
							else
								_amountneeded--;
						}
						else
						{
							clickItem(1, _items[i]);

							NTC_PingDelay(500);
							continue potionloop;
						}
					}
				}
			}
		}

		_restartloop = false;
	} while(_restartloop);

	return _amountneeded;
}


function NTT_PotInRightColInt(potx, column, beltsize)
{
	for(var i = 0 ; i < beltsize ; i++)
	{
		if(potx-i*4 == column)
			return true;
	}

	return false;
}


function NTT_GetGambledItemInt()
{
	var n;
	var _items;
	var _founditem;

	_items = NTC_GetItems();

	if(!_items)
		return false;

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY)
		{
			_founditem = true;

			for(n = 0 ; n < _NTT_OldItems.length ; n++)
			{
				if(_items[i].gid == _NTT_OldItems[n])
				{
					_founditem = false;
					break;
				}
			}

			if(_founditem)
				return _items[i];
		}
	}

	return false;
}


function NTT_GetOldItemsInt()
{
	var _items;

	_NTT_OldItems = new Array();

	_items = NTC_GetItems();

	if(!_items)
		return false;

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == ITEMLOC_INVENTORY)
			_NTT_OldItems.push(_items[i].gid);
	}
	
	return true;
}


// cubing stuff
function initRecipeList()
{
	var count = 0;
	var temp = [];
	
	for (var r =0; r< NT_RecipieBox.length;r++)
	{
		var newrep = new Recipie();
		
		for(var i = 0; i < NT_RecipieBox[r].length; i++)
		{
			if(typeof(NT_RecipieBox[r][i]) == 'string')
			{
				newrep.ingredients.push(NT_RecipieBox[r][i]);		
				newrep.ingredients[newrep.ingredients.length-1].key = false;
				//newrep.ingredients[count].nip= ;
				temp = njipParseLine(NT_RecipieBox[r][i]);

				if (temp.length != 2)
				{
					print("problem parsing "+NT_RecipieBox[r][i]);
					delay(500);
				}
				else
				{
					newrep.list.push(temp[1]);
				}
				
				count++;
			}
			else
			{
				newrep.ingredients[newrep.ingredients.length-1].key = NT_RecipieBox[r][i];
			}
			
			count = 0;
		}
		recipieList.push(newrep);
	}
}


function Recipie() 
{
	this.list = [];
	this.matchlist = []; 	
	this.ingredients = new Array();
	this.preMakeFunc = false;
	this.foundGids = [];
}


Recipie.prototype.doCube = 
	function()
	{
		//print("do Cube"+this.toSource())
		if(typeof(this.preMakeFunc) == 'function')
			this.preMakeFunc();
			
		openStash();
		
		if(!ClearCube())
		{
			print("failed to clear cube");
			return false;
		}
		
		var cube = false;
		var meItems = me.getItems();
		
		for (var j = 0 ; j < meItems.length; j++)
		{
			if (meItems[j].code =="box")
			{
				cube = copyUnit(meItems[j]);
			}
		}
		
		if(!cube)
			return false;
			
		for (var k = 0 ; k < this.matchlist.length; k++)
		{
			print("Moving "+this.matchlist[k].name+" to Cube");
			MoveItemToCube(this.matchlist[k],cube);
		}
		
		print("Transmuting");
		NTT_DoInteract(cube);
		transmute();
		
		delay(500);
		me.cancel();
		print("Clearing Cube");
		
		openStash();
		ClearCube();
		return true;
	};


function MoveItemToCube(item,cube)
{
	if(!cube)
	{
		var meItems = me.getItems();
		
		for (var j = 0 ; j > meItems.length; j++)
		{
			if(meItems[j].code =="box")
				cube = copyUnit(meItems[j]);
		}
	}
	
	var cloc = cube.location;
	var cx = cube.x;
	var cy = cube.y;
	
	if(!cube)
		return false;
	
	if(!item)
		return false;

	NTC_ItemToCursor(item);

	for(var i = 0 ; i < 30 ; i++)
	{
		if((i % 10) == 0)
		{	
			clickItem(0, cx, cy, cloc);
			NTC_PingDelay(50);
		}
		
		if(!me.itemoncursor)
		{
			NTC_PingDelay(200);
			
			if(!me.itemoncursor)
			{
				NTSI_PickItems();
				return true;
			}
		}
	}
	
	if(me.itemoncursor)
	{
		if(me.itemoncursor.code=="box")	// crap we picked up box
		{
			if(cloc==ITEMLOC_INVENTORY)
				MoveItemToInv(me.itemoncursor);
			else
				MoveItemToStash(me.itemoncursor);
		}
	}
	
	return true;
}


function CheckRecipieList()
{
	var utilityCubeList = [];
	var meItems = me.getItems();
	var tempvar = -1;
	for (var meI = 0 ; meI < meItems.length; meI++)
	{
		for (var r = 0; r<  recipieList.length; r++)
		{	
			//print(recipieList[r].list.toSource())
			tempvar = njipCheckGoodItemlist(meItems[meI],false,recipieList[r].list);
			
			if ( tempvar > -1 )	// matchlist[j]?
			{ 
				recipieList[r].matchlist[tempvar] = copyUnit( meItems[meI]);
				tempvar = -1;
			}
		} // next r	
	} // next meI

	var matches = 0;
	
	for (var r = 0; r<  recipieList.length; r++)
	{		
		tempvar = false;
		matches = 0;
		
		for (var i=0; i < recipieList[r].ingredients.length; i++)
		{
			if(recipieList[r].matchlist[i])
			{
				matches ++;
				
				if(recipieList[r].ingredients[i].key)	//key ingredient
					tempvar = true;
			}
			else
			{
				if (recipieList[r].ingredients[i].key)  //second key missing dont utilize
					tempvar = false;
			}

			if(tempvar && !recipieList[r].matchlist[i])
			{
				utilityCubeList.push(recipieList[r].ingredients[i]);		
			}
		}// next i	
		
		if(matches == recipieList[r].ingredients.length)
			recipieList[r].doCube();
	} // next r	
	
	var keyFound = false;
	// recipie has no key ingredients we wanna utility those too
	
	for (var r = 0; r<  recipieList.length; r++)
	{
		keyFound = false;
		
		for (var i=0; i < recipieList[r].ingredients.length; i++)
		{
			if(recipieList[r].ingredients[i].key) 
				keyFound = true;
		}
		
		if(!keyFound)
		{
			for (var i=0; i < recipieList[r].ingredients.length; i++)
			{
				var templist = njipParseLine(recipieList[r].ingredients[i]);	//build stat list for good check
				if (templist[0] == 0 && templist[1][0]) 
					utilityList.push(templist[1]); // equivlaent to list	
			}
		}
	}
		
	// build utility cube list
	for (var j = 0; j < utilityCubeList.length; j ++)
	{
		templist = njipParseLine(utilityCubeList[j]); //build stat list for good check
		
		if (templist[0] == 0 && templist[1][0]) 
			utilityList.push(templist[1]); // equivlaent to list
	}
}


function njipCheckGoodItemlist(item_, mode_,list)
{
	var retval = 0;
	
	var rv = false;
	var cv = -1;
	var matched = -1;
	if(item_) 
	{
		var stats = item_.getStat(-1);

		for(var count_9=0;count_9<list.length;count_9++) 
		{ 
			// loop all item entries
			rv = true;
			
			for(var count_a=0;count_a<list[count_9].length;count_a++) 
			{ 
				// loop all 'and' clauses
				switch(list[count_9][count_a][0]) 
				{
					case -1:
						cv = item_.itemType;
					break;
					
					case -2:
						cv = item_.classid;
					break;
					
					case -3:
						cv = item_.itemclass;
					break;
					
					case -4:
						cv = item_.quality;
					break;
					
					case -5:
						if(item_.getFlag(list[count_9][count_a][1]))
							cv = list[count_9][count_a][1];
						else
							cv = 0;
					break;
					
					case -6:
						cv = item_.lvlreq;
					break;
					
					case -7:
						cv = item_.ilvl;
					break;
					
					case -8:
						cv = item_.getItemCost(1);
					break;
					
					default:
						// using a stat, so if unidentified, 'maybe' pick up this item, unless another matches
						if(!item_.getFlag( ITEM_FLAG_UNIDENTIFIED )) 
						{
							retval = -1;
							matched = count_9;
						}

						if(typeof list[count_9][count_a][0] == "object")
						{
							var statId = parseInt(list[count_9][count_a][0][0],10);
							var subStatId = parseInt(list[count_9][count_a][0][1],10);
						} 
						else 
						{
							var statId = parseInt(list[count_9][count_a][0],10);
							var subStatId = -1;
						}

						if(subStatId < 0)
							cv = item_.getStat(statId);
						else
						{
							for(var n = 0 ; n < stats.length ; n++)
							{
								if(stats[n][0] == statId && stats[n][1] == subStatId)
								{
									cv = stats[n][2];
									break;
								}
							}

							if(n >= stats.length)
								cv = item_.getStat(statId, subStatId);
						}
					break;
				}
				
				if(!njipCheckClause(list[count_9][count_a][1], list[count_9][count_a][2], cv) ) 
				{
					rv = false;
					break;
				}
			}
			
			if(rv==1 && !list[count_9].found) 
			{
				matched = count_9;
				retval = 1;
				break;
			}
		}
	}
	
	if( mode_ == NJIP_CHECK_REPORT ) 
	{
		var obj = new Array();
		obj.result = retval;
		obj.lineno = (matched == -1 ? 0 : list[matched].lineno);
		obj.file = (matched == -1 ? "" : njipFiles[list[matched].file]);
		retval = obj;
	}
	
	if (retval) 
	{
		list[count_9].found=true;
		return count_9;
	}
	else
		return -1;
}


function ClearCube()
{
	print("clearin cube");
	
	var meItems =me.getItems();
	
	for (var j = 0 ; j < meItems.length; j++)
	{
		if (meItems[j].location == ITEMLOC_CUBE)
		{
			if(!MoveItemToStash(meItems[j]) && !MoveItemToInv(meItems[j])) 
			{
				print("Cant empty cube ClearCube Failed");
				return false;
			}		
		}
	}

	return true;	
}


function MoveItemToStash(it)
{
	var found = true;
	var my = (me.gametype == 1) ? 8 : 4;
	var buff = buildBuffer(ITEMLOC_STASH);
	
	for(var x=0; x<6; x++) 
	{ 
		// stash spaces
		for(var y=0; y<my; y++) 
		{
			found = true;
			
			for(var j=x; j < x + it.sizex; j++) 
			{ 
				// item spots				
				for(var k=y; k < y + it.sizey; k++) 
				{
					if(j > 6 || k > my || buff[j][k] ==1)
						found = false;
				}	//next k
			}	//next j
			
			if(found)
			{
				// move item to x/y
				if(NTC_ItemToCursor(it))
				{					
					for(var n = 0 ; n < 50 ; n++)
					{
						if((n % 10) == 0)				
							clickItem(0, x, y, ITEMLOC_STASH);
							
						NTC_Delay(100);
						
						if(!me.itemoncursor)
						{
							NTSI_PickItems();
							return true;
						}
					}
				}
			}
		}	//next y
	}	//next x
	
	return false;
}


function MoveItemToInv(it)
{
	var found = true;
	var buff = buildBuffer(ITEMLOC_INVENTORY);
	
	for(var x=0; x<10; x++) 
	{ 
		// stash spaces
		for(var y=0; y<4; y++) 
		{
			found = true;	
			for(var j=x; j < x + it.sizex; j++) 
			{ 
				// item spots
				for(var k=y; k < y + it.sizey; k++) 
				{
					if(j >= 10 || 4 >= k || buff[j][k] == 1 )
					found = false;
				}	//next k
			}	//next j
			
			if(found)
			{ 
				// move item to x/y
				if(NTC_ItemToCursor(it))
				{
					NTC_Delay(500);
					
					for(var n = 0 ; n < 50 ; n++)
					{
						if((n % 10) == 0)
							clickItem(0, x, y, ITEMLOC_INVENTORY);
							
						NTC_Delay(100);
						
						if(!me.itemoncursor)
						{
							NTSI_PickItems()
							return true;
						}
					}
				}
			}
			else 
			{
				if(NTConfig_BeepOnFull)	
					beep();		// ImprisonedPride: no space for item in inventory, if NTConfig_BeepOnFull is true, beep; 
			}
		}	//next y
	}	//next x
	
	return false;
}


function openStash()
{
	NTTM_TownMove("stash");

	for(var i = 0 ; i < 10 ; i++)
	{
		var  _stash = NTC_GetUnit(NTC_UNIT_OBJECT, NTC_UNIT_STASH);

		if(_stash)
			break;
	}

	if(_stash)
	{
		NTT_ClearInventory();
		NTT_DoInteract(_stash);
	}
}


function buildBuffer(loc)
{
	var mx,my;
	
	switch(loc) 
	{
		case ITEMLOC_INVENTORY: //inventory
			mx = 10; 
			my = 4; 
		break;
		
		case ITEMLOC_CUBE: // cube
			mx = 3; 
			my = 4; 
		break;
		
		case ITEMLOC_STASH: // Stash
			mx = 6; 
			my = (me.gametype == 1) ? 8 : 4; 
		break;		
	}

	var _stashspace = new KArray2D(mx,my);

	for(var y = 0 ; y < my ; y++)
	{
		for(var x = 0 ; x < 6 ; x++)
			_stashspace[x][y] = 0;
	}

	var _items = NTC_GetItems();

	if(!_items)
		return false;

	for(var i = 0 ; i < _items.length ; i++)
	{
		if(_items[i].mode == 0 && _items[i].location == loc)
		{
			for(y = 0 ; y < _items[i].sizey ; y++)
			{
				for(x = 0 ; x < _items[i].sizex ; x++)
				{
					_stashspace[x+_items[i].x][y+_items[i].y] = 1;
				}
			}
		}
	}

	return _stashspace;
}


function KArray2D(NumOfRows,NumOfCols)
{
	var k = new Array(NumOfRows);  // could be just[] 
	
	for (var i = 0; i < k . length; ++ i)
	{
		k [i] = new Array (NumOfCols); // could be just[] vaulue dosent matter after its array
	}
	
	return k; 
}


function NTSB_QuickShop(npc)
{
	print("�c2NTSB �c1:: �c3Doing a quick shop.");
	
	var _items = NTC_GetItems(npc);
	
	if(_items)
	{
		var _count;
		print("�c2NTSB �c1:: �c3Got items!");
		
		for(_count = 0;_count < _items.length;_count++)
		{
			if(njipCheckGoodItem(_items[_count], NJIP_CHECK_SIMPLE) != 0 && (_items[_count].classid < 587 || _items[_count].classid > 596))
			{
				if(NTT_CheckSpace(_items[_count].sizex,_items[_count].sizey))
				{
					print("�c2NTSB �c1::�c3 " + _items[_count].name + "�c2 -> item was good!");
					NTC_Delay(500);
					
					if(!NTT_ShopItem(_items[_count],npc,3))
					{
						print("�c2NTSB �c1::�c1 Error while shopping!");
						return false;
					} 
					else 
					{
						writeLog(_items[_count], me, 0, 0);
					}
				}
				else 
				{
					print("�c2NTSB �c1::�c1 Not enough space to buy item :(!");
				}
			}
		}
	}
	else 
	{
		print("�c2NTSB �c1::�c3 Error getting items...");
		return false;
	}
	
	print("�c2NTSB �c1:: �c3Done.");
	return true;
}