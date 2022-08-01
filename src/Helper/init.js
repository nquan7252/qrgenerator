export const alignment={
    2:[6,18],
    3:[6,22],
    4:[6,26],
    5:[6,30],
    6:[6,34],
    7:[6,22,38],
    8:[6,24,42],
    9:[6,26,46],
    10:[6,28,50],
    11:[6,30,54],
    12:[6,32,58],
    13:[6,34,62],
    14:[6,26,46,66],
    15:[6,26,48,70],
    16:[6,26,50,74],
    17:[6,30,54,78],
    18:[6,30,56,82],
    19:[6,30,58,86],
    20:[6,34,62,90],
    21:[6,28,50,72,94],
    22:[6,26,50,74,98],
    23:[6,30,54,78,102],
    24:[6,28,54,80,106],
    25:[6,32,58,84,110],
    26:[6,30,58,86,114],
    27:[6,34,62,90,118],
    28:[6,26,50,74,98,122],
    29:[6,30,54,78,102,126],
    30:[6,26,52,78,104,130],
    31:[6,30,56,82,108,134],
    32:[6,34,60,86,112,138],
    33:[6,30,58,86,114,142],
    34:[6,34,62,90,118,146],
    35:[6,30,54,78,102,126,150],
    36:[6,24,50,76,102,128,154],
    37:[6,28,54,80,106,132,158],
    38:[6,32,58,84,110,136,162],
    39:[6,26,54,82,110,138,166],
    40:[6,30,58,86,114,142,170],
}
export const fillFinderPatterns=(mat,version)=>{
    drawFinderPatterns(mat,[0,0])
    drawFinderPatterns(mat,[((((version-1)*4)+21) - 7), 0])
    drawFinderPatterns(mat,[0,((((version-1)*4)+21) - 7)])
}
export const fillSeparator=(mat)=>{
    for (let i=0;i<8;i++){
        mat[7][i]=0
        mat[i][7]=0

        mat[7][mat.length-1-i]=0
        mat[i][mat.length-8]=0

        mat[mat.length-8][i]=0
        mat[mat.length-1-i][7]=0
        }
}
export const drawFinderPatterns=(mat,topleft)=>{
    for (let i=0;i<7;i++){
        mat[topleft[0]][topleft[1]+i]=1
        mat[topleft[0]+i][topleft[1]]=1
        mat[topleft[0]+6][topleft[1]+i]=1
        mat[topleft[0]+i][topleft[1]+6]=1

        if (i>=2&&i<=4){
            mat[topleft[0]+i][topleft[1]+2]=1
            mat[topleft[0]+i][topleft[1]+3]=1
            mat[topleft[0]+i][topleft[1]+4]=1

        }
         if (i>=1&&i<=5){
            mat[topleft[0]+1][topleft[1]+i]=0
            mat[topleft[0]+i][topleft[1]+1]=0
            mat[topleft[0]+5][topleft[1]+i]=0
            mat[topleft[0]+i][topleft[1]+5]=0
        }
    }
}
export const fillTiming=(mat)=>{
    for (let i=0;i<mat.length;i++){
        if((mat[6][8+i]==1&&mat[6][8+i+1]==1)||(mat[8+i][6]==1&&mat[8+i+1][6]==1))
        break;
        if (i%2==0){
            mat[6][8+i]=1
            mat[8+i][6]=1
        }
        else{
            mat[6][8+i]=0
            mat[8+i][6]=0
        }
    }
}
export const fillAlignment=(mat,version)=>{
    let combinations=getAllCombinations(alignment[version])
    for (let combination of combinations){
        if (mat[combination[0]][combination[1]]==-1){
            drawAlignment(mat,combination)
        }
    }
}
export const drawAlignment=(mat,position)=>{
    let topleft=[position[0]-2,position[1]-2]
    for (let i=0;i<5;i++){
        mat[topleft[0]][topleft[1]+i]=1
        mat[topleft[0]+i][topleft[1]]=1
        mat[topleft[0]+4][topleft[1]+i]=1
        mat[topleft[0]+i][topleft[1]+4]=1
    }
    mat[position[0]][position[1]]=1
}
export const fillBlackModule=(mat)=>{
    mat[mat.length-8][8]=1
}
export const fillReserved=(mat,version)=>{
    for (let i=0;i<9;i++){
        mat[8][i]=2
        mat[i][8]=2
        if (i<=7){
            mat[8][mat.length-1-i]=2
            mat[mat.length-1-i][8]=2
        }
        
    }
    if (version>=7){
        for (let i=0;i<6;i++){
            mat[mat.length-1-8][i]=2
            mat[mat.length-1-9][i]=2
            mat[mat.length-1-10][i]=2

            mat[i][mat.length-1-8]=2
            mat[i][mat.length-1-9]=2
            mat[i][mat.length-1-10]=2

        }
    }
}
export const getAllCombinations=(arr)=>{
    let result=[];
    for (let i=0;i<arr.length;i++){
        for (let j=0;j<arr.length;j++){
            result.push([arr[i],arr[j]])
        }
    }
    return result;
}
export const convertBinary8bit=(str)=>{
     str=str.split("");
    for (let i=0;i<str.length;i++){
        str[i]=str[i].charCodeAt(0).toString(2);
        while (str[i].length<8){
            str[i]='0'+str[i]
        }
    }
    return str;
}
export const fillData=(mat,str)=>{
    let strArr=convertBinary8bit(str);
    let row=mat.length-1;
    let column=mat.length-1;
    let goingUp=true;
    for (let str of strArr){
        for (let char of str){
            while(mat[row][column]!=-1){
                //check hit
                if (row-1==8&&(column+1)%2==0&&goingUp==true&&column>=mat.length-8){
                    goingUp=false
                    column=column-1;
                }
                else if(row==0&&(column+1)%2==0&&goingUp==true){
                    goingUp=false;
                    column=column-1;
                }
                else if (row==mat.length-1&&(column+1)%2==0&&goingUp==false){
                    goingUp=true;
                    column=column-1
                }
                //special case
                else if (row==9&&column==7){
                    goingUp=false;
                    column=column-2;
                }



                else if ((column+1)%2==0){
                    if (goingUp){
                        column=column+1;
                        row=row-1;
                    }
                    else {
                        column=column+1
                        row=row+1;
                    }
                }
                else
                column=column-1
            }
            mat[row][column]=Number(char)
        }
    }
    console.log('row',row,'column',column)
}
 export const init=(mat,version,str)=>{
    fillFinderPatterns(mat,version)
    fillSeparator(mat)
    fillReserved(mat,version)

    if (version>=2) fillAlignment(mat,version)
    fillTiming(mat)
    fillBlackModule(mat)
  fillData(mat,str)
}
// let mat=new Array(49).fill(0)
// for (let i in mat){
//     mat[i]=new Array(49).fill(0)
// }
// init(mat,8)
// console.table(mat)