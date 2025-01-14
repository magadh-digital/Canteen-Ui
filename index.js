let arr = [1, 2, 4, 4, 5,58, 8, 9, 10, 58]



let max = arr[0]
let secondmax = max

for (let i = 0; i < arr?.length; i++) {
    for (let j = 0; j < arr.length - i- 1; j++) {
        if(arr[j] > arr[j+1]){
            console.log( arr[j]>arr[j+1])
            let temp = arr[j]
            arr[j] = arr[j+1]
            arr[j+1] = temp
        }
        
    }
}
console.log(arr)

// console.log(max, secondmax)





