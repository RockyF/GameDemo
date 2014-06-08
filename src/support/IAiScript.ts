/**
 * Created by RockyF on 2014/6/8.
 */

interface IAiScript{
	onCreate():void;
	onDestroy():void;
	onSwitchState():void;
	onStep():void;
}