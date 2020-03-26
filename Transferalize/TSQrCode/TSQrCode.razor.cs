using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{

    public class TSQrCodeBase : ComponentBase
    {

        public ElementReference TSQrCodeContainer;

        public TSQrCodeOptions QrOpts { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public string Text { get; set; } = "";

        [Parameter]
        public int Width { get; set; } = 128;

        [Parameter]
        public int Height { get; set; } = 128;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                SetOptionsByParameters();
                _ = await JSInterop.InvokeAsync<object>("RunTSQrCode", TSQrCodeContainer, QrOpts);
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters()
        {
            QrOpts = new TSQrCodeOptions
            {
                Text = Text,
                Height = Height,
                Width = Width
            };
        }

        public async Task UpdateCode(string code)
        {
            QrOpts.Text = code;
            await JSInterop.InvokeAsync<object>("RunTSQrCode", TSQrCodeContainer, QrOpts);
            StateHasChanged();
        }

    }
}
