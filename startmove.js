function getByClass(oParent,sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	for( var i=0;i<aEle.length;i++)
	{
		console.log("aEle[i].className", aEle[i].className)
		if(aEle[i].className==sClass)
		{
			aResult.push(aEle[i]);	
		}	
	}
	return aResult;	
}

function getStyle(obj,name)//获取非行间样式
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,false)[name];	
	}	
}

function startMove(obj,json,fnEnd)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;
		
			for(var attr in json)
		{
			var cur=0;
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getStyle(obj, attr))*100); 
				//四舍五入	Math.round
			}else
			{
				// console.log("22222")
				// console.log("getStyle(obj, attr)", getStyle(obj, attr))
				cur=parseInt(getStyle(obj, attr));	
			}
			
			var speed=(json[attr]-cur)/10;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
				
			if(cur!=json[attr])	
			bStop=false;
				 
				if(attr=='opacity')
				{
					obj.style.filter='alpha(opacity:'+(cur+speed)+')';
					obj.style.opacity=(cur+speed)/100;
				}else
				{
					 obj.style[attr]=cur+speed+'px';	
				}			   
		}
			if(bStop)
			{
				clearInterval(obj.timer);	
				if(fnEnd)fnEnd();
			}
	},30);
}
