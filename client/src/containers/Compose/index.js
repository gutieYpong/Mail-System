

const Compose = () => {
  return (
    <div id="compose-view">
      <h3>New Email</h3>
      <form id="compose-form">
        <div class="form-group">
          From: <input disabled class="form-control" value="{{ request.user.email }}" name="sendfrom" />
        </div>
        <div class="form-group">
          To: <input id="compose-recipients" class="form-control" />
        </div>
        <div class="form-group">
          <input class="form-control" id="compose-subject" placeholder="Subject" />
        </div>
        <textarea class="form-control" id="compose-body" placeholder="Body"></textarea>
        <input onclick="submit_mails()" type="button" class="btn btn-primary" value="Submit" />
      </form>
    </div>
  )
}

export default Compose;