function submitForm(form) {
  const inputs = form.querySelectorAll("input");
  const textareas = form.querySelectorAll("textarea");
  const data = [...inputs, ...textareas];
  const results = {};
  // console.log(data);
  data.forEach(d => {
    if (d.type === "submit") return;

    if (d.type === "radio" && !d.checked) return;

    if (d.type === "checkbox" && d.checked) {
      if (!results[d.name]) results[d.name] = [];
      results[d.name].push(d.value);
      return;
    }
    if (d.type === "checkbox" && !d.checked) return;
    results[d.name] = d.value;
  });
  console.log(results);
}
