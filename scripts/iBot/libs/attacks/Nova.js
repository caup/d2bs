js_strict(true);
/*	Nova Untimed Attack Sequence
 *		Uses Nova ethier as the only skill, or to complement a timed attack.
 *	Configuration:
 *		[Nova]
 *		Enable - Set if you want to use Nova at all, default is false.
 *		Enable=false
 */
Attack.addAttack({
	Skill:Skills.Get(Skill.Nova),
	
	//Configuration Values
	//Enabled:Interface.read("Nova", "Enable", true),
	
	//Check if we should use Nova against given monster.
	Predicate:function(mon) {
		if (mon.getStat(Stats.LightningResist) >= 100)
			return false;
		return true;
	},
	
	//Do it!
	Func:function(mon) {
		Pather.MoveToRange(mon, mon.area, this.Skill.castRange);
		this.Skill.Cast(mon);
	}
});