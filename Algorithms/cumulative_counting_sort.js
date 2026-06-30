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

    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    let output = new Array(n);

    for (let i = n - 1; i >= 0; i--) {
        let value = arr[i];
        output[count[value] - 1] = value;
        count[value]--;
    }

    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }

    return arr;
}