[返回](经济/股市/量化交易/)

###### 在 function 中改变全局变量

```javascript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wallneradam
//@version=4
study("Global variables", overlay=false)

// Declare constants to access global variables
IDX_STOCH = 0
IDX_RSI = 1

// Initialize an empty array to store variables
global = array.new_float(2)

// This is the modify the array
calculate(period) =>
    v_stoch = stoch(close, high, low, period)
    v_rsi = rsi(close, period)
    array.set(global, IDX_STOCH, v_stoch)
    array.set(global, IDX_RSI, v_rsi)
     
// Call the function any times you want
calculate(14)
// Plot the results
plot(array.get(global, IDX_STOCH), color=color.red)
plot(array.get(global, IDX_RSI), color=color.yellow)
// Call the function any times you want
calculate(14 * 5)
// Plot the results
plot(array.get(global, IDX_STOCH), color=color.maroon)
plot(array.get(global, IDX_RSI), color=color.olive)
```



###### 超级指标

```javascript
mult = input(title="超指F", type=input.float, defval=4)
len = input(title="超指L", type=input.integer, defval=14)
[superTrend, dir] = supertrend(mult, len)
colResistance = dir == 1 and dir == dir[1] ? color.new(color.red, 0) : color.new(color.red, 100)
colSupport = dir == -1 and dir == dir[1] ? color.new(color.green, 0) : color.new(color.green, 100)
plot(superTrend, color = colResistance, linewidth=2)
plot(superTrend, color = colSupport, linewidth=2)
```



###### 均线趋势判断

```javascript
down_guai = falling(ch_long, 3)
// 由涨转跌
plotshape(down_guai and ch_long > 0, style=shape.xcross, offset=0, location=location.belowbar, color=color.red, transp=0, size=size.tiny)
// 加速下跌
plotshape(down_guai and ch_long < 0, style=shape.xcross, offset=0, location=location.belowbar, color=color.red, transp=0, size=size.tiny)

up_gai = rising(ch_long, 3) 
// 加速上涨 
plotshape(up_gai and ch_long+ch_long[1]+ch_long[2] > 0, style=shape.xcross, offset=0, location=location.abovebar, color=color.green, transp=0, size=size.tiny)
// 上涨放缓; 由跌转涨
plotshape(up_gai and ch_long+ch_long[1]+ch_long[2] < 0, style=shape.xcross, offset=0, location=location.abovebar, color=color.green, transp=0, size=size.tiny)

```

