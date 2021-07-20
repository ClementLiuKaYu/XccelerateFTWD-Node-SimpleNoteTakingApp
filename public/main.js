var notesTemplate = Handlebars.compile(
  `
  {{#each notes}}
  <div class="card m-3">
    <div class="card-body py-0">
      <button
        type="button"
        class="btn-close"
        style="position: absolute; top:5px; right:5px"
      ></button>
      <form>
        <textarea
          class="note form-control my-3 p-0"
          rows="4"
          style="border: 0px; resize: none;"
          id={{this.id}}
        >{{this.content}}</textarea>
      </form>
    </div>
  </div>
{{/each}}
    `
);

const bindListener = () => {
  const reloadNotes = (notes) => {
    $("#notes").html(notesTemplate({ notes: notes }));
    bindListener();
  };

  axios.get("/api/notes/").then((res) => {
    reloadNotes(res.data);
  });

  $("#add").submit((e) => {
    e.preventDefault();

    let val = $("textarea[name=note]").val();
    if (val === "") {
      return;
    }

    $("textarea[name=note]").val("");
    axios
      .post("/api/notes/", {
        note: val,
      })
      .then((res) => {
        reloadNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.location.reload();
      });
  });

  $(".note").on("blur", (e) => {
    const noteId = e.target.id;
    console.log($(`#${noteId}`).val());

    axios
      .put(`/api/notes/${noteId}`, {
        note: $(`#${noteId}`).val(),
      })
      .then((res) => {
        reloadNotes(res.data);
      });
  });

  $(".btn-close").on("click", (e) => {
    const noteId = e.target.nextElementSibling[0].id;
    $.ajax(`/api/notes/${noteId}`, { method: "DELETE" }).then((res) => {
      reloadNotes(res);
    });
  });
};

bindListener();
