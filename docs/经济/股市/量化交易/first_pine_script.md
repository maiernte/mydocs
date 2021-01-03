[返回](经济/股市/量化交易/)

```javascript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © goldentianya

//@version=4
study("学习脚本", overlay=true)
//plot(high, title='high')
//plot(close, title='close', color=color.red)
// if barstate.isrealtime
//     label.new(x=3360, y=high, xloc=xloc.bar_index, text='Hi')

bartime = time - time[1]
i_offset = 5
label_offset = i_offset * bartime
// if barstate.islast
//     id = label.new(x=time + label_offset, y=high, xloc=xloc.bar_time, text="ddd")
//     label.delete(id[1])

// var label id = na
// label.delete(id)
// id := label.new(x=time + label_offset, y=high, xloc=xloc.bar_time, text=tostring(bar_index))    
    
// if barstate.ishistory     
//     line.new(x1=bar_index[1], y1=high[1], x2=bar_index, y2=high) 
    
// line.new(x1=bar_index[1], y1=low[1], x2=bar_index, y2=low, color=color.red) 

// bar = bar_index == 3350
// x1 = valuewhen(bar, bar_index, 0)
// y1 = valuewhen(bar, high, 0)

// if barstate.islast
//     line.new(x1=x1, y1=y1, x2=bar_index, y2=high)
    
max = -1E99, min = 1E99
max := nz(max(high, max[1]), high)
min := nz(min(low, min[1]), low)
var line maxline = line.new(bar_index[1], max, bar_index, max, extend=extend.none)
if change(max)
    line.set_xy1(maxline, x=bar_index, y=max)
    line.set_xy2(maxline, x=bar_index, y=max)
line.set_x2(maxline, x=bar_index)
    
    
var line minline = line.new(bar_index[1], min, bar_index, min, extend=extend.none)
if change(min)
    line.set_xy1(minline, x=bar_index, y=min)
    line.set_xy2(minline, x=bar_index, y=min)
line.set_x2(minline, x=bar_index)
    
var line line382 = line.new(bar_index, na, bar_index, na, extend=extend.none, style=line.style_dashed)
three82 = max - (max - min)*0.382
if change(max + min)
    line.set_xy1(line382, x=bar_index, y=three82)
    line.set_xy2(line382, x=bar_index, y=three82)
line.set_x2(line382, x=bar_index)

var label label382 = label.new(bar_index, na, text='0.382', style=label.style_label_left, textalign=text.align_right, size=size.small, textcolor=color.white)
label.set_xy(label382, bar_index, three82)
```