function counting_sort(arr) {
    let n = arr.length;
    let max = arr[0];

    for (let i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    let count = new Array(max + 1).fill(0);

    for (let i = 0; i < n; i++) {
        count[arr[i]]++;
    }

    let k = 0;
    for (let i = 0; i <= max; i++) {
        while (count[i] > 0) {
            arr[k] = i;
            k++;
            count[i]--;
        }
    }

    return arr;
}