function merge_sort(arr, left, right) {
    if (left >= right) {
        return;
    }

    let mid = Math.floor((left + right) / 2);

    merge_sort(arr, left, mid);
    merge_sort(arr, mid + 1, right);
    
    merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
    let newArr = [];
    let i = left;
    let j = mid + 1;
    let k = 0;

    while (i <= mid && j <= right) {
        if (arr[i] < arr[j]) {
            newArr[k++] = arr[i++];
        } else {
            newArr[k++] = arr[j++];
        }
    }

    while (i <= mid) {
        newArr[k++] = arr[i++];
    }

    while (j <= right) {
        newArr[k++] = arr[j++];
    }

    for (let p = 0; p < newArr.length; p++) {
        arr[left + p] = newArr[p];
    }
}